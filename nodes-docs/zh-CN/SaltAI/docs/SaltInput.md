
# Documentation
- Class name: `SaltInput`
- Category: `SALT/IO`
- Output node: `True`

SaltInput节点旨在为Salt AI平台的工作流创建和配置输入。它允许用户定义输入的各个方面，如名称、描述、类型和默认值，以及其他属性，如允许的值、是否需要用户覆盖，以及路径是否应被视为相对路径。该节点在为不同类型的数据定制和简化输入过程中发挥着关键作用，确保工作流设计的灵活性和适应性。

# Input types
## Required
- **`input_name`**
    - 指定输入的名称，作为工作流中输入字段的唯一标识符和标签。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`input_desc`**
    - 为输入提供描述，为用户提供关于如何提供输入值的上下文或说明。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`input_type`**
    - 定义输入的类型，如STRING、FLOAT、INT等，决定了用户需要提供的数据的预期格式和性质。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`input_value`**
    - 输入的默认值，可以预先填写但用户可以更改。支持多行字符串，设计用于动态输入场景。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Optional
- **`input_image`**
    - 可选参数，用于提供图像作为输入，增强节点处理视觉数据类型的能力。
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`input_mask`**
    - 可选参数，用于提供蒙版作为输入，在需要识别或处理图像特定区域的场景中很有用。
    - Comfy dtype: `MASK`
    - Python dtype: `Mask`
- **`input_allowed_values`**
    - 指定输入允许值的字符串，指导用户提供有效数据并确保输入完整性。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`user_override_required`**
    - 确定用户是否必须为默认输入值提供覆盖，确保关键输入的用户交互和验证。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`relative_path`**
    - 指示提供的输入路径是否应被视为相对路径，影响输入数据的访问和管理方式。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`

# Output types
- **`value`**
    - 输出配置的输入值。
    - Comfy dtype: `*`
    - Python dtype: `unknown`
- **`ui`**
    - 生成输入配置的用户界面表示，包括元数据和输出结果，便于交互和视觉反馈。
    - Comfy dtype: `*`
    - Python dtype: `unknown`


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
