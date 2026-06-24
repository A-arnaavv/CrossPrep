import subprocess
import tempfile
import os


class CodeExecutionService:

    @staticmethod
    def run_python(
        code: str,
    ):
        try:

            with tempfile.NamedTemporaryFile(
                suffix=".py",
                delete=False,
                mode="w",
            ) as file:

                file.write(code)

                path = file.name

            result = subprocess.run(
                ["python", path],
                capture_output=True,
                text=True,
                timeout=5,
            )

            os.unlink(path)

            return {
                "success": True,
                "output":
                    result.stdout
                    or result.stderr,
            }

        except Exception as e:

            return {
                "success": False,
                "output": str(e),
            }

    @staticmethod
    def run_javascript(
        code: str,
    ):
        try:

            with tempfile.NamedTemporaryFile(
                suffix=".js",
                delete=False,
                mode="w",
            ) as file:

                file.write(code)

                path = file.name

            result = subprocess.run(
                ["node", path],
                capture_output=True,
                text=True,
                timeout=5,
            )

            os.unlink(path)

            return {
                "success": True,
                "output":
                    result.stdout
                    or result.stderr,
            }

        except Exception as e:

            return {
                "success": False,
                "output": str(e),
            }

    @staticmethod
    def run_python_tests(
        code: str,
        function_name: str,
        test_cases: str,
    ):
        import json
        import textwrap

        try:
            parsed_tests = json.loads(
                test_cases
            )

            test_runner = textwrap.dedent(
                f"""
                import json

                test_cases = json.loads(
                    '''{json.dumps(parsed_tests)}'''
                )

                results = []

                for index, test in enumerate(test_cases):
                    try:
                        actual = {function_name}(**test["input"])
                        expected = test["expected_output"]

                        results.append({{
                            "test_case": index + 1,
                            "passed": actual == expected,
                            "actual_output": actual,
                            "expected_output": expected
                        }})

                    except Exception as e:
                        results.append({{
                            "test_case": index + 1,
                            "passed": False,
                            "actual_output": str(e),
                            "expected_output": test.get("expected_output")
                        }})

                print("__TEST_RESULTS_START__")
                print(json.dumps(results))
                """
            )

            full_code = (
                code.rstrip()
                + "\n\n"
                + test_runner
            )

            return (
                CodeExecutionService
                .run_python(
                    full_code
                )
            )

        except Exception as e:
            return {
                "success": False,
                "output": str(e),
            }