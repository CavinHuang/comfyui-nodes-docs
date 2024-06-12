---
tags:
- RandomGeneration
- Randomization
---

# True Random.org Number Generator
## Documentation
- Class name: `True Random.org Number Generator`
- Category: `WAS Suite/Number`
- Output node: `False`

This node interfaces with the RANDOM.ORG API to generate true random numbers based on atmospheric noise. It allows for the generation of integers within a specified range, ensuring randomness through external entropy sources.
## Input types
### Required
- **`api_key`**
    - The API key for accessing RANDOM.ORG's services. It's essential for authentication and utilizing the API to generate random numbers.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`minimum`**
    - The lower bound of the range within which random numbers are generated. It defines the smallest possible value of the generated numbers.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`maximum`**
    - The upper bound of the range within which random numbers are generated. It defines the largest possible value of the generated numbers.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`mode`**
    - Determines the mode of number generation, offering flexibility in how randomness is applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The generated random number as an integer.
    - Python dtype: `int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The generated random number as a float.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The generated random number, explicitly indicating it's an integer for clarity.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_True_Random_Number:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "api_key": ("STRING",{"default":"00000000-0000-0000-0000-000000000000", "multiline": False}),
                "minimum": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615}),
                "maximum": ("FLOAT", {"default": 10000000, "min": -18446744073709551615, "max": 18446744073709551615}),
                "mode": (["random", "fixed"],),
            }
        }

    RETURN_TYPES = ("NUMBER", "FLOAT", "INT")
    FUNCTION = "return_true_randm_number"

    CATEGORY = "WAS Suite/Number"

    def return_true_randm_number(self, api_key=None, minimum=0, maximum=10):

        # Get Random Number
        number = self.get_random_numbers(api_key=api_key, minimum=minimum, maximum=maximum)[0]

        # Return number
        return (number, )

    def get_random_numbers(self, api_key=None, amount=1, minimum=0, maximum=10, mode="random"):
        '''Get random number(s) from random.org'''
        if api_key in [None, '00000000-0000-0000-0000-000000000000', '']:
            cstr("No API key provided! A valid RANDOM.ORG API key is required to use `True Random.org Number Generator`").error.print()
            return [0]

        url = "https://api.random.org/json-rpc/2/invoke"
        headers = {"Content-Type": "application/json"}
        payload = {
            "jsonrpc": "2.0",
            "method": "generateIntegers",
            "params": {
                "apiKey": api_key,
                "n": amount,
                "min": minimum,
                "max": maximum,
                "replacement": True,
                "base": 10
            },
            "id": 1
        }

        response = requests.post(url, headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            data = response.json()
            if "result" in data:
                return data["result"]["random"]["data"], float(data["result"]["random"]["data"]), int(data["result"]["random"]["data"])

        return [0]

    @classmethod
    def IS_CHANGED(cls, api_key, mode, **kwargs):
        m = hashlib.sha256()
        m.update(api_key)
        if mode == 'fixed':
            return m.digest().hex()
        return float("NaN")

```
