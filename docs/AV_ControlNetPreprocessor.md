
# Documentation
- Class name: AV_ControlNetPreprocessor
- Category: Art Venture/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_ControlNetPreprocessor节点旨在为ControlNet框架内的进一步处理或分析准备图像。它允许对图像应用各种预处理技术，包括分辨率调整和特定预处理器的选择，以优化它们以满足ControlNet的要求。

# Input types
## Required
- image
    - 需要预处理的输入图像。这是进行预处理操作的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: ImageType
- preprocessor
    - 指定要应用于输入图像的预处理技术。它可以是几个预定义的预处理器之一或自定义预处理器，影响预处理结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sd_version
    - 指示要使用的Stable Diffusion的具体版本，影响预处理如何与模型的要求保持一致。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- resolution
    - 输出图像的所需分辨率，可以根据特定的质量或性能标准进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- preprocessor_override
    - 允许用替代预处理器覆盖最初选择的预处理器，为预处理选择提供灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - 预处理后的图像，准备在ControlNet框架内进行进一步处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: ImageType
- CNET_NAME
    - 在预处理过程中使用或识别的ControlNet的名称，为后续处理步骤提供上下文。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)



## Source code
```python
class AV_ControlNetPreprocessor:
    preprocessors = list(control_net_preprocessors.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "preprocessor": (["None", "tile"] + s.preprocessors,),
                "sd_version": (["sd15", "sd15++", "sdxl", "sdxl_t2i", "sdxl_lllite"],),
            },
            "optional": {
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "preprocessor_override": ("STRING", {"default": "None"}),
            },
        }

    RETURN_TYPES = ("IMAGE", "STRING")
    RETURN_NAMES = ("IMAGE", "CNET_NAME")
    FUNCTION = "detect_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def detect_controlnet(self, image, preprocessor, sd_version, resolution=512, preprocessor_override="None"):
        if preprocessor_override != "None":
            if preprocessor_override not in control_net_preprocessors:
                print(
                    f"Warning: Not found ControlNet preprocessor {preprocessor_override}. Use {preprocessor} instead."
                )
            else:
                preprocessor = preprocessor_override

        image = apply_preprocessor(image, preprocessor, resolution=resolution)
        control_net_name = detect_controlnet(preprocessor, sd_version)

        return (image, control_net_name)

```
