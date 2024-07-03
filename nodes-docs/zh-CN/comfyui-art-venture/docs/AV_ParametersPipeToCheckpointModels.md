
# Documentation
- Class name: `AV_ParametersPipeToCheckpointModels`
- Category: `Art Venture/Parameters`
- Output node: `False`

AV_ParametersPipeToCheckpointModels节点旨在将管道结构中封装的一组参数转换为特定的模型检查点名称和配置。它充当抽象参数定义和具体模型实例化之间的桥梁，便于根据提供的参数动态选择和配置模型。

# Input types
## Required
- pipe
    - pipe参数作为模型相关参数的容器，包括检查点名称、VAE名称和上采样器名称。它在根据封装的参数确定要实例化的特定模型和配置方面起着至关重要的作用。
    - Comfy dtype: PIPE
    - Python dtype: Dict

# Output types
- pipe
    - 返回更新后的pipe结构，现在包括根据输入参数解析出的模型检查点、VAE和上采样器的名称和配置。
    - Comfy dtype: PIPE
    - Python dtype: Dict
- ckpt_name
    - 从输入参数派生的主要检查点模型名称。
    - Comfy dtype: CHECKPOINT_NAME
    - Python dtype: str
- secondary_ckpt_name
    - 从输入参数派生的次要检查点模型名称。
    - Comfy dtype: CHECKPOINT_NAME
    - Python dtype: str
- vae_name
    - 从输入参数派生的VAE模型名称。
    - Comfy dtype: VAE_NAME
    - Python dtype: str
- upscaler_name
    - 从输入参数派生的主要上采样器模型名称。
    - Comfy dtype: UPSCALER_NAME
    - Python dtype: str
- secondary_upscaler_name
    - 从输入参数派生的次要上采样器模型名称。
    - Comfy dtype: UPSCALER_NAME
    - Python dtype: str
- lora_1_name
    - 从输入参数派生的第一个Lora模型名称。
    - Comfy dtype: LORA_NAME
    - Python dtype: str
- lora_2_name
    - 从输入参数派生的第二个Lora模型名称。
    - Comfy dtype: LORA_NAME
    - Python dtype: str
- lora_3_name
    - 从输入参数派生的第三个Lora模型名称。
    - Comfy dtype: LORA_NAME
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVParametersPipeToCheckpointModels:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE",),
            },
        }

    RETURN_TYPES = (
        "PIPE",
        "CHECKPOINT_NAME",
        "CHECKPOINT_NAME",
        "VAE_NAME",
        "UPSCALER_NAME",
        "UPSCALER_NAME",
        "LORA_NAME",
        "LORA_NAME",
        "LORA_NAME",
    )
    RETURN_NAMES = (
        "pipe",
        "ckpt_name",
        "secondary_ckpt_name",
        "vae_name",
        "upscaler_name",
        "secondary_upscaler_name",
        "lora_1_name",
        "lora_2_name",
        "lora_3_name",
    )
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "parameter_pipe_to_checkpoint_models"

    def parameter_pipe_to_checkpoint_models(self, pipe: Dict = {}):
        ckpt_name = pipe.get("ckpt_name", None)
        secondary_ckpt_name = pipe.get("secondary_ckpt_name", None)
        vae_name = pipe.get("vae_name", None)
        upscaler_name = pipe.get("upscaler_name", None)
        secondary_upscaler_name = pipe.get("secondary_upscaler_name", None)
        lora_1_name = pipe.get("lora_1_name", None)
        lora_2_name = pipe.get("lora_2_name", None)
        lora_3_name = pipe.get("lora_3_name", None)

        return (
            pipe,
            ckpt_name,
            secondary_ckpt_name,
            vae_name,
            upscaler_name,
            secondary_upscaler_name,
            lora_1_name,
            lora_2_name,
            lora_3_name,
        )

```
