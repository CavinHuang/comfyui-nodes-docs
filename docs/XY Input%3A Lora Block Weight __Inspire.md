
# Documentation
- Class name: XY Input: Lora Block Weight __Inspire
- Category: InspirePack/LoraBlockWeight
- Output node: False

该节点旨在处理和可视化Lora模型中不同块的权重，通过XY绘图帮助理解模型的内部表示。它使用户能够比较和对比各个块的影响，从而洞察模型的行为并有助于优化或解释其工作原理。

# Input types
## Required
- category_filter
    - 将分析过滤到特定类别，允许对Lora模型内的块权重进行有针对性的探索。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- lora_name
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- strength_model
    - 调整模型的强度参数，影响块权重对整体分析的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 设置块权重的裁剪强度，通过强调更显著的权重来优化可视化效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- inverse
    - 决定是否反转块权重，提供另一种视角来观察它们的影响。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - 提供随机数生成的种子，确保分析的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- A
    - 影响块权重计算的参数，是模型内部配置的一部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- B
    - 另一个影响块权重计算的参数，有助于增加模型的分析深度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preset
    - 选择分析的预设配置，简化设置过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- block_vectors
    - 指定要分析的代表块的向量，直接影响可视化输出。
    - Comfy dtype: STRING
    - Python dtype: str
- heatmap_palette
    - 选择热图可视化的调色板，增强结果的可解释性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- heatmap_alpha
    - 设置热图的不透明度，允许调整可视化的清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- heatmap_strength
    - 决定热图的强度，影响块权重的视觉区分度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- xyplot_mode
    - 选择XY绘图的模式，定义可视化的结构和重点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- X (vectors)
    - 输出代表分析块的向量，为XY绘图和进一步分析做好准备。
    - Comfy dtype: XY
    - Python dtype: list[XY_Capsule]
- Y (effect_compares)
    - 输出分析块的比较效果，通过可视化促进对其影响的深入理解。
    - Comfy dtype: XY
    - Python dtype: list[XY_Capsule]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYInput_LoraBlockWeight:
    @staticmethod
    def resolve_vector_string(vector_string, preset_dict):
        vector_string = vector_string.strip()

        if vector_string in preset_dict:
            return vector_string, preset_dict[vector_string]

        vector_infos = vector_string.split(':')

        if len(vector_infos) > 1:
            return vector_infos[0], vector_infos[1]
        elif len(vector_infos) > 0:
            return vector_infos[0], vector_infos[0]
        else:
            return None, None

    @classmethod
    def INPUT_TYPES(cls):
        preset = ["Preset"]  # 20
        preset += load_lbw_preset("lbw-preset.txt")
        preset += load_lbw_preset("lbw-preset.custom.txt")

        default_vectors = "SD-NONE/SD-ALL\nSD-ALL/SD-ALL\nSD-INS/SD-ALL\nSD-IND/SD-ALL\nSD-INALL/SD-ALL\nSD-MIDD/SD-ALL\nSD-MIDD0.2/SD-ALL\nSD-MIDD0.8/SD-ALL\nSD-MOUT/SD-ALL\nSD-OUTD/SD-ALL\nSD-OUTS/SD-ALL\nSD-OUTALL/SD-ALL"

        lora_names = folder_paths.get_filename_list("loras")
        lora_dirs = [os.path.dirname(name) for name in lora_names]
        lora_dirs = ["All"] + list(set(lora_dirs))

        return {"required": {
                             "category_filter": (lora_dirs, ),
                             "lora_name": (lora_names, ),
                             "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "inverse": ("BOOLEAN", {"default": False, "label_on": "True", "label_off": "False"}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "A": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "B": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "preset": (preset,),
                             "block_vectors": ("STRING", {"multiline": True, "default": default_vectors, "placeholder": "{target vector}/{reference vector}", "pysssss.autocomplete": False}),
                             "heatmap_palette": (["viridis", "magma", "plasma", "inferno", "cividis"], ),
                             "heatmap_alpha":  ("FLOAT", {"default": 0.8, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "heatmap_strength": ("FLOAT", {"default": 1.5, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "xyplot_mode": (["Simple", "Diff", "Diff+Heatmap"],),
                             }}

    RETURN_TYPES = ("XY", "XY")
    RETURN_NAMES = ("X (vectors)", "Y (effect_compares)")

    FUNCTION = "doit"
    CATEGORY = "InspirePack/LoraBlockWeight"

    def doit(self, lora_name, strength_model, strength_clip, inverse, seed, A, B, preset, block_vectors, heatmap_palette, heatmap_alpha, heatmap_strength, xyplot_mode, category_filter=None):
        xy_type = "XY_Capsule"

        preset_dict = load_preset_dict()
        common_params = lora_name, strength_model, strength_clip, inverse, block_vectors, seed, A, B, heatmap_palette, heatmap_alpha, heatmap_strength, xyplot_mode

        storage = {}
        x_values = []
        x_idx = 0
        for block_vector in block_vectors.split("\n"):
            if block_vector == "":
                continue

            item = block_vector.split('/')

            if len(item) > 0:
                target_vector = item[0].strip()
                ref_vector = item[1].strip() if len(item) > 1 else ''

                x_item = None
                label, block_vector = XYInput_LoraBlockWeight.resolve_vector_string(target_vector, preset_dict)
                _, ref_block_vector = XYInput_LoraBlockWeight.resolve_vector_string(ref_vector, preset_dict)
                if label is not None:
                    x_item = XY_Capsule_LoraBlockWeight(x_idx, 0, block_vector, label, storage, common_params)
                    x_idx += 1

                if x_item is not None and ref_block_vector is not None:
                    x_item.set_reference_vector(ref_block_vector)

                if x_item is not None:
                    x_values.append(x_item)

        if xyplot_mode == "Simple":
            y_values = [XY_Capsule_LoraBlockWeight(0, 0, '', 'target', storage, common_params)]
        elif xyplot_mode == "Diff":
            y_values = [XY_Capsule_LoraBlockWeight(0, 0, '', 'target', storage, common_params),
                        XY_Capsule_LoraBlockWeight(0, 1, '', 'reference', storage, common_params),
                        XY_Capsule_LoraBlockWeight(0, 2, '', 'diff', storage, common_params)]
        else:
            y_values = [XY_Capsule_LoraBlockWeight(0, 0, '', 'target', storage, common_params),
                        XY_Capsule_LoraBlockWeight(0, 1, '', 'reference', storage, common_params),
                        XY_Capsule_LoraBlockWeight(0, 2, '', 'diff', storage, common_params),
                        XY_Capsule_LoraBlockWeight(0, 3, '', 'heatmap', storage, common_params)]

        return ((xy_type, x_values), (xy_type, y_values), )

```
