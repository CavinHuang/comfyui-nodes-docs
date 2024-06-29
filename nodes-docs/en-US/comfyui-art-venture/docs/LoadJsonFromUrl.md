---
tags:
- Json
---

# Load JSON From URL
## Documentation
- Class name: `LoadJsonFromUrl`
- Category: `Art Venture/Utils`
- Output node: `False`

The node is designed to fetch JSON data from a specified URL, providing a straightforward way to load and integrate external data into the node's workflow.
## Input types
### Required
- **`url`**
    - The URL from which JSON data is to be fetched. It serves as the primary source for the node to retrieve data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`print_to_console`**
    - A flag to control whether the fetched JSON content should be printed to the console, aiding in debugging or verification.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`json`**
    - Comfy dtype: `JSON`
    - The JSON data retrieved from the specified URL, ready for further processing or utilization within the node's workflow.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilLoadJsonFromUrl:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"default": ""}),
            },
            "optional": {
                "print_to_console": ("BOOLEAN", {"default": False}),
            },
        }

    RETURN_TYPES = ("JSON",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "load_json"

    def load_json(self, url: str, print_to_console=False):
        response = requests.get(url, timeout=5)
        if response.status_code != 200:
            raise Exception(response.text)

        res = response.json()
        if print_to_console:
            print("JSON content:", json.dumps(res))

        return (res,)

```
