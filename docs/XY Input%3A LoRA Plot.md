
# Documentation
- Class name: XY Input: LoRA Plot
- Category: Efficiency Nodes/XY Inputs
- Output node: False
- Repo Ref: https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes

该节点专门设计用于生成 LoRA (Low-Rank Adaptation) 参数的 XY 图表数据，有助于可视化不同 LoRA 配置之间的关系及其影响。它能够动态处理各种 LoRA 相关的输入，生成用于绘图的协调 X 和 Y 值，适用于多种 LoRA 参数，如批次、权重、模型强度和裁剪强度。

# Input types
## Required
- input_mode
    - 指定输入模式，决定在生成图表时考虑哪些 LoRA 参数（如批次、权重、模型强度、裁剪强度）。这影响节点如何处理和解释提供的数据。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_name
    - 正在可视化的 LoRA 配置的名称，对于在图表中识别和区分各种 LoRA 设置至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- model_strength
    - 应用的模型适应强度，在可视化模型强度对 LoRA 效果的影响时相关。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_strength
    - 应用的裁剪强度，在评估裁剪强度对 LoRA 性能的影响时相关。
    - Comfy dtype: FLOAT
    - Python dtype: float
- X_batch_count
    - 指定 X 轴值要考虑的批次数量，影响图表的精细度。
    - Comfy dtype: INT
    - Python dtype: int
- X_batch_path
    - X 轴批次数据的文件路径，对于定位和处理要可视化的特定 LoRA 数据至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- X_subdirectories
    - 指示在搜索批次数据时是否应包括子目录，影响 X 轴考虑的数据范围。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- X_batch_sort
    - 决定 X 轴批次数据的排序顺序，可能影响图表对时间或序数关系的表示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- X_first_value
    - 用于生成 X 轴模型强度或裁剪强度范围的起始值，设置图表的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- X_last_value
    - 用于生成 X 轴模型强度或裁剪强度范围的结束值，设置图表的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Y_batch_count
    - 指定 Y 轴值要考虑的批次数量，影响图表的精细度。
    - Comfy dtype: INT
    - Python dtype: int
- Y_first_value
    - 用于生成 Y 轴模型强度或裁剪强度范围的起始值，设置图表的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Y_last_value
    - 用于生成 Y 轴模型强度或裁剪强度范围的结束值，设置图表的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- lora_stack
    - 可选的 LoRA 配置堆栈，可以包含在图表中，允许在单个图表中可视化多个 LoRA 设置。
    - Comfy dtype: LORA_STACK
    - Python dtype: list

# Output types
- X
    - X 轴上表示的数据，包括从指定 LoRA 参数派生的类型和值。
    - Comfy dtype: XY
    - Python dtype: tuple
- Y
    - Y 轴上表示的数据，包括从指定 LoRA 参数派生的类型和值。
    - Comfy dtype: XY
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_LoRA_Plot:

    modes = ["X: LoRA Batch, Y: LoRA Weight",
             "X: LoRA Batch, Y: Model Strength",
             "X: LoRA Batch, Y: Clip Strength",
             "X: Model Strength, Y: Clip Strength",
            ]

    @classmethod
    def INPUT_TYPES(cls):
        loras = ["None"] + folder_paths.get_filename_list("loras")
        return {"required": {
                "input_mode": (cls.modes,),
                "lora_name": (loras,),
                "model_strength": ("FLOAT", {"default": 1.0, "min": -10.00, "max": 10.0, "step": 0.01}),
                "clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "X_batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "X_batch_path": ("STRING", {"default": xy_batch_default_path, "multiline": False}),
                "X_subdirectories": ("BOOLEAN", {"default": False}),
                "X_batch_sort": (["ascending", "descending"],),
                "X_first_value": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "X_last_value": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "Y_batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "Y_first_value": ("FLOAT", {"default": 0.0, "min": 0.00, "max": 10.0, "step": 0.01}),
                "Y_last_value": ("FLOAT", {"default": 1.0, "min": 0.00, "max": 10.0, "step": 0.01}),},
            "optional": {"lora_stack": ("LORA_STACK",)}
        }

    RETURN_TYPES = ("XY","XY",)
    RETURN_NAMES = ("X","Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def __init__(self):
        self.lora_batch = TSC_XYplot_LoRA_Batch()

    def generate_values(self, mode, X_or_Y, *args, **kwargs):
        result = self.lora_batch.xy_value(*args, **kwargs)

        if result and result[0]:
            xy_type, xy_value_list = result[0]

            # Adjust type based on the mode
            if "LoRA Weight" in mode:
                xy_type = "LoRA Wt"
            elif "Model Strength" in mode:
                xy_type = "LoRA MStr"
            elif "Clip Strength" in mode:
                xy_type = "LoRA CStr"

            # Check whether the value is for X or Y
            if "LoRA Batch" in mode: # Changed condition
                return self.generate_batch_values(*args, **kwargs)
            else:
                return ((xy_type, xy_value_list),)

        return (None,)

    def xy_value(self, input_mode, lora_name, model_strength, clip_strength, X_batch_count, X_batch_path, X_subdirectories,
                 X_batch_sort, X_first_value, X_last_value, Y_batch_count, Y_first_value, Y_last_value, lora_stack=None):

        x_value, y_value = [], []
        lora_stack = lora_stack if lora_stack else []

        if "Model Strength" in input_mode and "Clip Strength" in input_mode:
            if lora_name == 'None':
                return (None,None,)
        if "LoRA Batch" in input_mode:
            lora_name = None
        if "LoRA Weight" in input_mode:
            model_strength = None
            clip_strength = None
        if "Model Strength" in input_mode:
            model_strength = None
        if "Clip Strength" in input_mode:
            clip_strength = None

        # Handling X values
        if "X: LoRA Batch" in input_mode:
            try:
                x_value = self.lora_batch.xy_value(X_batch_path, X_subdirectories, X_batch_sort,
                                                   model_strength, clip_strength, X_batch_count, lora_stack)[0][1]
            except Exception as e:
                print(f"{error('XY Plot Error:')} {e}")
                return (None,)
            x_type = "LoRA Batch"
        elif "X: Model Strength" in input_mode:
            x_floats = generate_floats(X_batch_count, X_first_value, X_last_value)
            x_type = "LoRA MStr"
            x_value = [[(lora_name, x, clip_strength)] + lora_stack for x in x_floats]

        # Handling Y values
        y_floats = generate_floats(Y_batch_count, Y_first_value, Y_last_value)
        if "Y: LoRA Weight" in input_mode:
            y_type = "LoRA Wt"
            y_value = [[(lora_name, y, y)] + lora_stack for y in y_floats]
        elif "Y: Model Strength" in input_mode:
            y_type = "LoRA MStr"
            y_value = [[(lora_name, y, clip_strength)] + lora_stack for y in y_floats]
        elif "Y: Clip Strength" in input_mode:
            y_type = "LoRA CStr"
            y_value = [[(lora_name, model_strength, y)] + lora_stack for y in y_floats]

        return ((x_type, x_value), (y_type, y_value))

```
