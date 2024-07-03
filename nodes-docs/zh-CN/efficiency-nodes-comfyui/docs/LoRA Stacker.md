
# Documentation
- Class name: LoRA Stacker
- Category: Efficiency Nodes/Stackers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LoRA Stacker节点旨在将LoRA（低秩适应）参数聚合并配置成结构化格式，便于在不同的模型组件中操作和应用LoRA调整。该节点支持通过输入参数进行动态配置，允许根据特定需求自定义LoRA参数。

# Input types
## Required
- input_mode
    - 指定输入处理模式，决定LoRA参数如何聚合和构建。这会影响输出中LoRA参数的配置和表示方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_count
    - 定义要考虑的LoRA调整数量，决定了聚合的规模和要处理的参数数量。
    - Comfy dtype: INT
    - Python dtype: int
- lora_name_i
    - 指定每个LoRA参数的名称，允许识别和配置单个LoRA调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_wt_i
    - 确定每个LoRA参数的权重，影响调整对模型的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- model_str_i
    - 指定每个LoRA参数的模型调整强度，影响模型的行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_str_i
    - 定义每个LoRA参数的裁剪强度，控制应用调整的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- lora_stack
    - 一个可选的预配置LoRA参数堆栈，可以用当前配置扩展或修改，增强了LoRA参数管理的灵活性。
    - Comfy dtype: LORA_STACK
    - Python dtype: list of tuples

# Output types
- LORA_STACK
    - 返回LoRA参数的结构化表示，可用于模型组件中的进一步处理或应用。
    - Comfy dtype: LORA_STACK
    - Python dtype: list of tuples


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)
    - [Eff. Loader SDXL](../../efficiency-nodes-comfyui/Nodes/Eff. Loader SDXL.md)
    - [CR Apply LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply LoRA Stack.md)
    - Reroute



## Source code
```python
class TSC_LoRA_Stacker:
    modes = ["simple", "advanced"]

    @classmethod
    def INPUT_TYPES(cls):
        loras = ["None"] + folder_paths.get_filename_list("loras")
        inputs = {
            "required": {
                "input_mode": (cls.modes,),
                "lora_count": ("INT", {"default": 3, "min": 0, "max": 50, "step": 1}),
            }
        }

        for i in range(1, 50):
            inputs["required"][f"lora_name_{i}"] = (loras,)
            inputs["required"][f"lora_wt_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["required"][f"model_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["required"][f"clip_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})

        inputs["optional"] = {
            "lora_stack": ("LORA_STACK",)
        }
        return inputs

    RETURN_TYPES = ("LORA_STACK",)
    RETURN_NAMES = ("LORA_STACK",)
    FUNCTION = "lora_stacker"
    CATEGORY = "Efficiency Nodes/Stackers"

    def lora_stacker(self, input_mode, lora_count, lora_stack=None, **kwargs):

        # Extract values from kwargs
        loras = [kwargs.get(f"lora_name_{i}") for i in range(1, lora_count + 1)]

        # Create a list of tuples using provided parameters, exclude tuples with lora_name as "None"
        if input_mode == "simple":
            weights = [kwargs.get(f"lora_wt_{i}") for i in range(1, lora_count + 1)]
            loras = [(lora_name, lora_weight, lora_weight) for lora_name, lora_weight in zip(loras, weights) if
                     lora_name != "None"]
        else:
            model_strs = [kwargs.get(f"model_str_{i}") for i in range(1, lora_count + 1)]
            clip_strs = [kwargs.get(f"clip_str_{i}") for i in range(1, lora_count + 1)]
            loras = [(lora_name, model_str, clip_str) for lora_name, model_str, clip_str in
                     zip(loras, model_strs, clip_strs) if lora_name != "None"]

        # If lora_stack is not None, extend the loras list with lora_stack
        if lora_stack is not None:
            loras.extend([l for l in lora_stack if l[0] != "None"])

        return (loras,)

```
