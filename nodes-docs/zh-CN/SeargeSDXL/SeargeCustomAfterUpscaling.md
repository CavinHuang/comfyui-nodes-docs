# Documentation
- Class name: SeargeCustomAfterUpscaling
- Category: MAGIC_CUSTOM_STAGES
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

这个节点类旨在处理放大操作后的图像数据，使用自定义输出来完善和增强图像的视觉质量。

# Input types
## Required
- custom_output
    - custom_output参数至关重要，因为它作为节点处理的主要输入。预期它包含来自前一个阶段的输出，然后用于检索和完善放大的图像。
    - Comfy dtype: SRG_STAGE_OUTPUT
    - Python dtype: Dict[str, Any]

# Output types
- image
    - 这个节点的输出是一个增强的图像，是处理custom_output参数的结果。这个图像预期具有更高的质量，并且准备用于进一步的使用或分析。
    - Comfy dtype: IMAGE
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeCustomAfterUpscaling:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'custom_output': ('SRG_STAGE_OUTPUT',)}, 'optional': {}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'output'
    CATEGORY = UI.CATEGORY_MAGIC_CUSTOM_STAGES

    def output(self, custom_output):
        if custom_output is None:
            return (None,)
        vae_decoded = retrieve_parameter(Names.S_UPSCALED, custom_output)
        image = retrieve_parameter(Names.F_UPSCALED_IMAGE, vae_decoded)
        return (image,)
```