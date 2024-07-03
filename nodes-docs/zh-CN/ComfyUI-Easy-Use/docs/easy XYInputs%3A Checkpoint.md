
# Documentation
- Class name: easy XYInputs: Checkpoint
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在简化模型检查点数据的处理和可视化过程，专注于基于检查点名称、CLIP跳过值和VAE名称生成XY输入值。它抽象化了处理多个检查点及其相关参数的复杂性，使用户能够轻松配置和可视化不同检查点对模型行为的影响。

# Input types
## Required
- input_mode
    - 指定输入模式，决定了如何处理和利用检查点、CLIP跳过值和VAE名称。它影响节点的执行路径和生成的XY值。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ckpt_count
    - 定义要处理的检查点数量，影响输出XY值的大小和组成。它决定了在操作中考虑多少组检查点相关参数。
    - Comfy dtype: INT
    - Python dtype: int
- ckpt_name_i
    - 表示检查点的名称。'ckpt_name_i'中的'i'范围从1到指定的检查点总数，允许单独指定多个检查点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clip_skip_i
    - 指示每个检查点的CLIP跳过值。'clip_skip_i'中的'i'范围从1到检查点总数，为每个检查点指定相关的CLIP跳过值。
    - Comfy dtype: INT
    - Python dtype: int
- vae_name_i
    - 指定与每个检查点关联的VAE名称。'vae_name_i'中的'i'范围从1到检查点总数，允许将特定VAE与各个检查点关联。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- optional_lora_stack
    - 一个可选参数，如果提供，会将LORA堆栈添加到检查点、CLIP跳过值和VAE名称的处理中，可能会改变生成的XY值。
    - Comfy dtype: LORA_STACK
    - Python dtype: str

# Output types
- X or Y
    - 输出是一组从处理后的检查点、CLIP跳过值和VAE名称派生的XY值，用于可视化或进一步分析。
    - Comfy dtype: X_Y
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Checkpoint:

    modes = ["Ckpt Names", "Ckpt Names+ClipSkip", "Ckpt Names+ClipSkip+VAE"]

    @classmethod
    def INPUT_TYPES(cls):

        checkpoints = ["None"] + folder_paths.get_filename_list("checkpoints")
        vaes = ["Baked VAE"] + folder_paths.get_filename_list("vae")

        inputs = {
            "required": {
                "input_mode": (cls.modes,),
                "ckpt_count": ("INT", {"default": 3, "min": 0, "max": 10, "step": 1}),
            }
        }

        for i in range(1, 10 + 1):
            inputs["required"][f"ckpt_name_{i}"] = (checkpoints,)
            inputs["required"][f"clip_skip_{i}"] = ("INT", {"default": -1, "min": -24, "max": -1, "step": 1})
            inputs["required"][f"vae_name_{i}"] = (vaes,)

        inputs["optional"] = {
            "optional_lora_stack": ("LORA_STACK",)
        }
        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"

    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, input_mode, ckpt_count, **kwargs):

        axis = "advanced: Checkpoint"

        checkpoints = [kwargs.get(f"ckpt_name_{i}") for i in range(1, ckpt_count + 1)]
        clip_skips = [kwargs.get(f"clip_skip_{i}") for i in range(1, ckpt_count + 1)]
        vaes = [kwargs.get(f"vae_name_{i}") for i in range(1, ckpt_count + 1)]

        # Set None for Clip Skip and/or VAE if not correct modes
        for i in range(ckpt_count):
            if "ClipSkip" not in input_mode:
                clip_skips[i] = 'None'
            if "VAE" not in input_mode:
                vaes[i] = 'None'

        # Extend each sub-array with lora_stack if it's not None
        values = [checkpoint.replace(',', '*')+','+str(clip_skip)+','+vae.replace(',', '*') for checkpoint, clip_skip, vae in zip(checkpoints, clip_skips, vaes) if
                        checkpoint != "None"]

        optional_lora_stack = kwargs.get("optional_lora_stack") if "optional_lora_stack" in kwargs else []

        xy_values = {"axis": axis, "values": values, "lora_stack": optional_lora_stack}
        return (xy_values,)

```
