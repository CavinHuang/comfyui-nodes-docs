---
tags:
- Debugging
---

# Debug (mtb)
## Documentation
- Class name: `Debug (mtb)`
- Category: `mtb/debug`
- Output node: `True`

The MTB_Debug node is designed for experimental debugging of various Comfy values, with future enhancements planned to support more types and widgets. It allows for the inspection and output of debugging information, facilitating the troubleshooting process in development.
## Input types
### Required
- **`output_to_console`**
    - Determines whether the debug output should be printed to the console. This affects how the node processes and displays the debugging information.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`ui`**
    - Contains the debugging output, including base64-encoded images and text, structured for UI display.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_Debug:
    """Experimental node to debug any Comfy values.

    support for more types and widgets is planned.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"output_to_console": ("BOOLEAN", {"default": False})},
        }

    RETURN_TYPES = ()
    FUNCTION = "do_debug"
    CATEGORY = "mtb/debug"
    OUTPUT_NODE = True

    def do_debug(self, output_to_console: bool, **kwargs):
        output = {
            "ui": {"b64_images": [], "text": []},
            # "result": ("A"),
        }

        processors = {
            torch.Tensor: process_tensor,
            list: process_list,
            dict: process_dict,
            bool: process_bool,
        }
        if output_to_console:
            for k, v in kwargs.items():
                print(f"{k}: {v}")

        for anything in kwargs.values():
            processor = processors.get(type(anything), process_text)
            processed_data = processor(anything)

            for ui_key, ui_value in processed_data.items():
                output["ui"][ui_key].extend(ui_value)

        return output

```
