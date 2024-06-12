---
tags:
- Audio
---

# Salt Workflow Input
## Documentation
- Class name: `SaltInput`
- Category: `SALT/IO`
- Output node: `True`

The SaltInput node is designed to facilitate the creation and configuration of inputs for workflows within the Salt AI platform. It allows users to define various aspects of an input, such as its name, description, type, and default value, along with additional properties like allowed values, whether user override is required, and if the path should be considered relative. This node plays a crucial role in customizing and streamlining the input process for different types of data, ensuring flexibility and adaptability in workflow design.
## Input types
### Required
- **`input_name`**
    - Specifies the name of the input, serving as a unique identifier and label for the input field within the workflow.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`input_desc`**
    - Provides a description for the input, offering context or instructions for the user on how to provide the input value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`input_type`**
    - Defines the type of the input, such as STRING, FLOAT, INT, etc., dictating the expected format and nature of the data to be provided by the user.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`input_value`**
    - The default value for the input, which can be pre-filled but is subject to change by the user. Supports multiline strings and is designed for dynamic input scenarios.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`input_image`**
    - An optional parameter for providing an image as input, enhancing the node's capability to handle visual data types.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`input_mask`**
    - An optional parameter for providing a mask as input, useful in scenarios requiring specific areas of an image to be identified or processed.
    - Comfy dtype: `MASK`
    - Python dtype: `Mask`
- **`input_allowed_values`**
    - Specifies a string of allowed values for the input, guiding the user in providing valid data and ensuring input integrity.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`user_override_required`**
    - Determines whether the user must provide an override for the default input value, ensuring user interaction and validation for critical inputs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`relative_path`**
    - Indicates whether the provided input path should be treated as relative, affecting how the input data is accessed and managed.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`value`**
    - Comfy dtype: `*`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - Generates a user interface representation of the input configuration, including metadata and output results, facilitating interactive and visual feedback.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltInput:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input_name": ("STRING", {}),
                "input_desc": ("STRING", {}),
                "input_type": (["STRING", "FLOAT", "INT", "BOOLEAN", "IMAGE", "MASK", "SEED", "FILE"],),
                "input_value": ("STRING", {"multiline": True, "dynamicPrompts": False})
            },
            "optional": {
                "input_image": ("IMAGE",),
                "input_mask": ("MASK",),
                "input_allowed_values": ("STRING", {"default": ""}),
                "user_override_required": ("BOOLEAN", {"default": False}),
                "relative_path": ("BOOLEAN", {"default": False})
            },
            "hidden": {"unique_id": "UNIQUE_ID"},
        }

    OUTPUT_NODE = True
    RETURN_TYPES = (WILDCARD,)
    RETURN_NAMES = ("value",)

    FUNCTION = "input"
    CATEGORY = "SALT/IO"

    def input(
        self,
        input_name,
        input_desc,
        input_value,
        input_type,
        input_image=None,
        input_mask=None,
        input_allowed_values="",
        user_override_required=False,
        relative_path=False,
        unique_id=0,
    ):
        src_image = None
        src_file = None
        is_asset = False

        # Is an asset type
        if input_type in ["IMAGE", "MASK", "FILE"]:
            is_asset = True

        # UI Output
        ui = {
            "ui": {
                "salt_input": [{
                    "id": unique_id,
                    "name": input_name or "input_" + str(unique_id),
                    "description": input_desc or "",
                    "asset": is_asset or False,
                    "type": input_type or "string",
                    "value": input_value or "",
                }]
            }
        }

        out = ""
        if is_asset:
            # Input value must be evaluated first to override input images/masks
            if input_value.strip():
                input_value = input_value.strip()
                # Load image from path from input_value
                if input_value.endswith(('.png', '.jpeg', '.jpg', '.gif', '.webp', '.tiff')):
                    try:
                        src_image = Image.open(input_value).convert("RGBA")
                    except Exception as e:
                        print(f"Error loading image from specified path {input_value}: {e}")
                # Passthrough input_value (which should be a path from Salt Backend)
                elif input_type == "FILE":

                    src_file = input_value # if os.path.exists(input_value) else "None"
                    if relative_path:
                        src_file = get_relative_path(src_file)

                    # Log value to console
                    log_values(unique_id, input_name, input_type, src_file)
                    
                    return {"ui": ui, "result": (src_file,)}
                else:
                    # Zoinks; how'd we get here?
                    raise AttributeError("Invalid node configuration! Do you mean to use `IMAGE`, `MASK`, or `FILE` input_types?")
            elif isinstance(input_image, torch.Tensor):
                # Input `IMAGE` is provided, so we act like a passthrough
                return (input_image, ui)
            elif isinstance(input_mask, torch.Tensor):
                # Input `MASK` is provided, so we act like a passthrough
                return (input_mask, ui)

            if src_image:
                if input_type == "MASK":
                    # If it's a mask and the image has an alpha channel, extract it
                    if src_image.mode == "RGBA":
                        alpha_channel = src_image.split()[-1]
                        src_image = pil2mask(alpha_channel.convert("L"))
                    # If no alpha channel, convert the whole image to grayscale as a mask (could be bitwise representation)
                    else:
                        src_image = pil2mask(src_image.convert("L"))
                elif input_type == "IMAGE":
                    # Ensure image is in RGB for `IMAGE`` data type
                    src_image = pil2tensor(src_image.convert("RGB"))

            else:
                # Gracefully allow execution to continue, provided a black image (to hopefully signal issue?)
                print("[WARNING] Unable to determine IMAGE or MASK to load!")
                print("[WARNING] Returning image blank")
                src_blank = Image.new("RGB", (512, 512), (0, 0, 0))
                if input_type == "IMAGE":
                    src_image = pil2tensor(src_blank)
                else:
                    src_image = pil2mask(src_blank)

            # Log value to console
            log_values(unique_id, input_name, input_type, src_image)

            return (src_image, ui)

        # We're still here? We must be dealing with a primitive value
        if input_allowed_values != "" and input_value.strip() not in [o.strip() for o in input_allowed_values.split(',')]:
            raise ValueError('The provided input is not a supported value')


        match input_type:
            case "STRING":
                out = str(input_value)
            case "INT":
                out = int(input_value)
            case "SEED":
                out = int(input_value)
            case "FLOAT":
                out = float(input_value)
            case "BOOLEAN":
                out = bool_str(input_value)
            case _:
                out = input_value

        # Log value to console
        log_values(unique_id, input_name, input_type, out)

        return (out, ui)

```
