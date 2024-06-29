# Documentation
- Class name: SeargeCustomAfterVaeDecode
- Category: UI.CATEGORY_MAGIC_CUSTOM_STAGES
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在通过解码和后处理变分自编码器（VAE）的输出来生成最终图像。它封装了将VAE的潜在空间表示转换为视觉输出所需的逻辑，提高了整个工作流程的效率和效果。

# Input types
## Required
- custom_output
    - custom_output参数至关重要，因为它作为VAE解码过程的输入。它是前一个阶段的输出，包含了节点执行其功能所需的必要信息。
    - Comfy dtype: SRG_STAGE_OUTPUT
    - Python dtype: Dict[str, Any]

# Output types
- image
    - 输出图像是VAE解码和后处理的结果。它代表了节点完成操作后的最终视觉产品，对于进一步的分析或显示至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeCustomAfterVaeDecode:

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
        vae_decoded = retrieve_parameter(Names.S_VAE_DECODED, custom_output)
        image = retrieve_parameter(Names.F_DECODED_IMAGE, vae_decoded)
        post_processed = retrieve_parameter(Names.F_POST_PROCESSED, vae_decoded)
        result = image if post_processed is None else post_processed
        return (result,)
```