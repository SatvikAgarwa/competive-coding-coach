import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

function runDocker(args) {
    return new Promise((resolve, reject) => {
        const process = spawn("docker", args);

        let stdout = "";
        let stderr = "";

        process.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        process.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        process.on("close", (code) => {
            resolve({ stdout, stderr, code });
        });

        process.on("error", (err) => {
            reject(err);
        });
    });
}

export async function runCode(code, input) {
    const tempDir = path.resolve(`temp_${crypto.randomUUID()}`);

    try {
        // Create workspace
        await fs.mkdir(tempDir);
        await fs.writeFile(path.join(tempDir, "code.cpp"), code);
        await fs.writeFile(path.join(tempDir, "input.txt"), input.join("\n"));

        /* =========================
           1️⃣ Compile Phase
        ========================== */

        const compileArgs = [
            "run",
            "--rm",
            "-v", `${tempDir}:/usr/src/app`,
            "-w", "/usr/src/app",
            "satvik-cpp-judge",
            "sh",
            "-c",
            "g++ code.cpp -O2 -o app"
        ];

        const compileResult = await runDocker(compileArgs);

        if (compileResult.code !== 0) {
            console.log("Verdict: Compile Error");
            console.log(compileResult.stderr);
            return;
        }

        /* =========================
           2️⃣ Execution Phase
        ========================== */

        const runArgs = [
            "run",
            "--rm",
            "--memory=256m",
            "--cpus=0.5",
            "--pids-limit=64",
            "--network=none",
            "--cap-drop=ALL",
            "--security-opt=no-new-privileges",
            "-v", `${tempDir}:/usr/src/app`,
            "-w", "/usr/src/app",
            "satvik-cpp-judge",
            "sh",
            "-c",
            "timeout 2s ./app < input.txt"
        ];

        const runResult = await runDocker(runArgs);

        /* =========================
           3️⃣ Verdict Logic
        ========================== */

        let verdict;

        if (runResult.code === 0) {
            verdict = "Accepted";
        } else if (runResult.code === 124) {
            verdict = "Time Limit Exceeded";
        } else {
            verdict = "Runtime Error";
        }

        console.log("Verdict:", verdict);
        console.log("Output:\n", runResult.stdout);
        console.log("Errors:\n", runResult.stderr);

    } catch (err) {
        console.error("Internal Error:", err);
    } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
    }
}

runCode();