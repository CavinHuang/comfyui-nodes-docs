
# Documentation
- Class name: easy XYInputs: Lora
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点用于动态选择和操作LORA（Low-Rank Adaptation）模型，以生成或修改XY输入值。它允许用户指定各种参数，如模型强度和剪裁强度，并可选择堆叠多个LORA配置以实现高级自定义。

# Input types
## Required
- input_mode
    - 定义输入模式，例如Lora名称是否包含权重，这影响LORA模型的选择和使用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_count
    - 指定要考虑的LORA模型数量，能够根据用户需求动态调整。
    - Comfy dtype: INT
    - Python dtype: int
- model_strength
    - 决定模型影响的强度，允许对LORA模型的影响进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_strength
    - 设置剪裁操作的强度，提供对LORA模型应用剪裁程度的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_name_i
    - 指定要在堆栈中考虑的LORA模型的名称，实现对LORA配置的定向选择。索引'i'的范围从1到'lora_count'指定的数量，允许指定多个LORA模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- model_str_i
    - 确定指定LORA模型的模型强度，允许精确控制其影响。索引'i'对应于'lora_name_i'指定的LORA模型。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_str_i
    - 设置指定LORA模型的剪裁强度，提供对剪裁效果的自定义。索引'i'对应于'lora_name_i'指定的LORA模型。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- optional_lora_stack
    - 允许包含现有的LORA配置堆栈，提供扩展或修改LORA设置的灵活性。
    - Comfy dtype: LORA_STACK
    - Python dtype: list

# Output types
- X or Y
    - 输出生成或修改的XY输入值，可直接应用或进行进一步处理。
    - Comfy dtype: X_Y
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Lora:

    modes = ["Lora Names", "Lora Names+Weights"]

    @classmethod
    def INPUT_TYPES(cls):
        loras = ["None"] + folder_paths.get_filename_list("loras")

        inputs = {
            "required": {
                "input_mode": (cls.modes,),
                "lora_count": ("INT", {"default": 3, "min": 0, "max": 10, "step": 1}),
                "model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            }
        }

        for i in range(1, 10 + 1):
            inputs["required"][f"lora_name_{i}"] = (loras,)
            inputs["required"][f"model_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["required"][f"clip_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})

        inputs["optional"] = {
            "optional_lora_stack": ("LORA_STACK",)
        }
        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"

    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, input_mode, lora_count, model_strength, clip_strength, **kwargs):

        axis = "advanced: Lora"
        # Extract values from kwargs
        loras = [kwargs.get(f"lora_name_{i}") for i in range(1, lora_count + 1)]
        model_strs = [kwargs.get(f"model_str_{i}", model_strength) for i in range(1, lora_count + 1)]
        clip_strs = [kwargs.get(f"clip_str_{i}", clip_strength) for i in range(1, lora_count + 1)]

        # Use model_strength and clip_strength for the loras where values are not provided
        if "Weights" not in input_mode:
            for i in range(lora_count):
                model_strs[i] = model_strength
                clip_strs[i] = clip_strength

        # Extend each sub-array with lora_stack if it's not None
        values = [lora.replace(',', '*')+','+str(model_str)+','+str(clip_str) for lora, model_str, clip_str
                    in zip(loras, model_strs, clip_strs) if lora != "None"]

        optional_lora_stack = kwargs.get("optional_lora_stack") if "optional_lora_stack" in kwargs else []

        print(values)
        xy_values = {"axis": axis, "values": values, "lora_stack": optional_lora_stack}
        return (xy_values,)

```
