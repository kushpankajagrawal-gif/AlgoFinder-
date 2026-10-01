# Phase 8 Sandbox Images

Create one minimal runtime image per supported language: `python`, `java`, `cpp`, and `javascript`.

Each image should:

- Run as a non-root user
- Contain only the required runtime/compiler
- Use a read-only base filesystem where practical
- Write only to a temporary working directory
- Be launched with network disabled, CPU/memory/PID limits, a wall-clock timeout, and automatic removal
- Never mount the host filesystem or Docker socket

The FastAPI service should select a runner from a fixed server-side language map. Do not accept an image name, command, or flags from the browser. A future production deployment should evaluate stronger isolation than Docker alone.
