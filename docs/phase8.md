# AlgoFinder Phase 8: Secure Code Execution

Phase 8 is the execution boundary for AlgoFinder. Phase 7 performs static analysis and explanation; Phase 8 performs compilation, execution, test comparison, and measurement.

## Security Boundary

The frontend sends code only to FastAPI. FastAPI validates the request and creates a short-lived, isolated sandbox. User code must never be executed with Python `exec`, on the API host, or through a shell command assembled from user input.

A production sandbox should use:

- One short-lived container per job
- Network disabled
- Non-root user
- CPU, memory, process, output, source-size, and wall-clock limits
- Temporary workspace only; no host mounts and no Docker socket
- Automatic cleanup after success, failure, timeout, or cancellation

Docker is a local development baseline, not a guarantee of complete public code-execution security. Review stronger isolation such as gVisor, Firecracker, or dedicated worker nodes before deployment.

## API Contract

### `POST /execute`

Request:

```json
{"language":"python","code":"print(input())","input":"Hello"}
```

Response values must be measured by the sandbox, never fabricated:

```json
{"status":"completed","stdout":"Hello\n","stderr":"","exit_code":0,"execution_time_ms":12,"memory_used_mb":18}
```

### `POST /compile`

Compiles Java/C++/other compiled sources in the sandbox and returns `success` or `compile_error` with actual stderr and exit code.

### `POST /run-tests`

Accepts `{ language, code, test_cases: [{ input, expected_output, comparison_mode }] }` and returns per-test actual output, expected output, status, error, and observed runtime.

### `GET /status`

Returns backend-driven readiness for API, Docker, and language runners. The frontend must display unavailable states when a runner is not ready.

## Output Comparison

Comparison is problem-specific. Supported modes should include `exact`, `trimmed`, and `whitespace_normalized`; do not sort outputs universally because ordering can be part of a problem contract.

## Execution States

`queued`, `validating`, `compiling`, `running`, `testing`, `completed`, `failed`, `timeout`, `memory_limit`, `compile_error`, `runtime_error`, and `cancelled` are user-visible states. Only show completed output and measurements returned by the backend.

## Local Setup Direction

1. Start the FastAPI service with the sandbox runner enabled.
2. Build language images from `docker/`.
3. Configure limits using `.env` or deployment secrets.
4. Point the Vite dev server/API proxy to FastAPI.
5. Run security tests for infinite loops, output floods, memory pressure, network access, filesystem access, and invalid language requests.

Phase 8 intentionally does not claim compilation, execution, test success, runtime, or memory until the sandbox service returns those facts.
