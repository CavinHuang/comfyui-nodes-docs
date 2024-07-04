
# Documentation
- Class name: XY Input: LoRA
- Category: Efficiency Nodes/XY Inputs
- Output node: False

该节点旨在处理和操作LoRA（Low-Rank Adaptation）参数，以生成XY图的输入数据。它处理各种LoRA相关的输入，如批处理信息、模型和剪辑强度以及权重，以生成适合可视化或进一步分析的结构化数据。该节点能够动态适应不同的LoRA配置，确保兼容性和灵活性，以满足多样化的分析需求。

# Input types
## Required
- input_mode
    - 指定节点的操作模式，影响LoRA参数在XY绘图中的处理和解释方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_path
    - 定义LoRA参数批处理的文件路径，使节点能够同时处理多个输入以进行XY绘图。
    - Comfy dtype: STRING
    - Python dtype: str
- subdirectories
    - 指示在批处理LoRA参数时是否考虑子目录，影响XY绘图数据包含的范围。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- batch_sort
    - 决定批处理LoRA参数的排序顺序，影响XY绘图数据的组织方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_max
    - 设置要处理的最大批次数，限制XY绘图考虑的LoRA参数量。
    - Comfy dtype: INT
    - Python dtype: int
- lora_count
    - 指定要处理的LoRA参数数量，直接影响XY绘图数据的组成。
    - Comfy dtype: INT
    - Python dtype: int
- model_strength
    - 定义LoRA参数的模型调整强度，影响XY绘图应用修改的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_strength
    - 设置LoRA参数的剪辑强度，影响XY绘图处理中应用的剪辑程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_name_i
    - 通过名称识别单个LoRA参数，允许在XY绘图过程中进行特定选择和操作。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- model_str_i
    - 指定单个LoRA参数的模型强度，实现对每个参数调整强度的精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_str_i
    - 确定单个LoRA参数的剪辑强度，允许对每个参数进行精确的剪辑调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- lora_stack
    - 表示可选的LoRA参数堆栈，为XY绘图贡献聚合的LoRA数据。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Any]

# Output types
- X or Y
    - 输出用于XY绘图的结构化LoRA数据，在X轴或Y轴中封装各种LoRA配置和参数。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[Any]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_LoRA:
    modes = ["LoRA Names", "LoRA Names+Weights", "LoRA Batch"]

    @classmethod
    def INPUT_TYPES(cls):
        loras = ["None"] + folder_paths.get_filename_list("loras")

        inputs = {
            "required": {
                "input_mode": (cls.modes,),
                "batch_path": ("STRING", {"default": xy_batch_default_path, "multiline": False}),
                "subdirectories": ("BOOLEAN", {"default": False}),
                "batch_sort": (["ascending", "descending"],),
                "batch_max": ("INT", {"default": -1, "min": -1, "max": XYPLOT_LIM, "step": 1}),
                "lora_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM, "step": 1}),
                "model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            }
        }

        for i in range(1, XYPLOT_LIM+1):
            inputs["required"][f"lora_name_{i}"] = (loras,)
            inputs["required"][f"model_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["required"][f"clip_str_{i}"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})

        inputs["optional"] = {
            "lora_stack": ("LORA_STACK",)
        }
        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def __init__(self):
        self.lora_batch = TSC_XYplot_LoRA_Batch()

    def xy_value(self, input_mode, batch_path, subdirectories, batch_sort, batch_max, lora_count, model_strength,
                 clip_strength, lora_stack=None, **kwargs):

        xy_type = "LoRA"
        result = (None,)
        lora_stack = lora_stack if lora_stack else []

        if "Batch" not in input_mode:
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
            xy_value = [[(lora, model_str, clip_str)] + lora_stack for lora, model_str, clip_str
                        in zip(loras, model_strs, clip_strs) if lora != "None"]

            result = ((xy_type, xy_value),)
        else:
            try:
                result = self.lora_batch.xy_value(batch_path, subdirectories, batch_sort, model_strength,
                                                  clip_strength, batch_max, lora_stack)
            except Exception as e:
                print(f"{error('XY Plot Error:')} {e}")

        return result

```
