
# Documentation
- Class name: XY Input: Checkpoint
- Category: Efficiency Nodes/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

TSC_XYplot_Checkpoint 节点专门用于处理与模型检查点相关的 XY 图数据。它主要关注验证和处理检查点值和剪辑跳过值，以便在模型训练和优化过程中进行效率分析。

# Input types
## Required
- target_ckpt
    - 指定目标检查点类型，可以是'Base'或'Refiner'，用于确定 XY 图数据处理的上下文。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- input_mode
    - 决定输入模式，影响检查点数据在 XY 图中的处理和可视化方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_path
    - 用于生成 XY 图的批处理数据文件路径，影响数据分析的来源。
    - Comfy dtype: STRING
    - Python dtype: str
- subdirectories
    - 布尔值，表示是否在批处理数据搜索中包含子目录，扩大数据分析范围。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- batch_sort
    - 指定批处理数据的排序顺序，可以是'ascending'或'descending'，用于组织分析数据。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_max
    - 定义 XY 图要考虑的最大批次数，为数据分析设置上限。
    - Comfy dtype: INT
    - Python dtype: int
- ckpt_count
    - 表示要包含在分析中的检查点数量，直接影响 XY 图的全面性。
    - Comfy dtype: INT
    - Python dtype: int
- ckpt_name_i
    - 指定第 i 个检查点的名称，允许对 XY 图中包含的检查点数据进行详细自定义。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clip_skip_i
    - 确定第 i 个检查点的剪辑跳过值，影响每个检查点的数据分析粒度。
    - Comfy dtype: INT
    - Python dtype: int
- vae_name_i
    - 识别第 i 个 VAE 模型的名称，使 XY 图分析中能够包含 VAE 特定数据。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- X or Y
    - 输出生成的 XY 图数据类型（'Clip Skip'或'Clip Skip (Refiner)'）以及相应的值，有助于效率分析。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Checkpoint:
    modes = ["Ckpt Names", "Ckpt Names+ClipSkip", "Ckpt Names+ClipSkip+VAE", "Checkpoint Batch"]
    @classmethod
    def INPUT_TYPES(cls):
        checkpoints = ["None"] + folder_paths.get_filename_list("checkpoints")
        vaes = ["Baked VAE"] + folder_paths.get_filename_list("vae")

        inputs = {
            "required": {
                        "target_ckpt": (["Base", "Refiner"],),
                        "input_mode": (cls.modes,),
                        "batch_path": ("STRING", {"default": xy_batch_default_path, "multiline": False}),
                        "subdirectories": ("BOOLEAN", {"default": False}),
                        "batch_sort": (["ascending", "descending"],),
                        "batch_max": ("INT", {"default": -1, "min": -1, "max": 50, "step": 1}),
                        "ckpt_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM, "step": 1})
            }
        }

        for i in range(1, XYPLOT_LIM+1):
            inputs["required"][f"ckpt_name_{i}"] = (checkpoints,)
            inputs["required"][f"clip_skip_{i}"] = ("INT", {"default": -1, "min": -24, "max": -1, "step": 1})
            inputs["required"][f"vae_name_{i}"] = (vaes,)

        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_ckpt, input_mode, batch_path, subdirectories, batch_sort, batch_max, ckpt_count, **kwargs):

        # Define XY type
        xy_type = "Checkpoint" if target_ckpt == "Base" else "Refiner"

        if "Batch" not in input_mode:
            # Extract values from kwargs
            checkpoints = [kwargs.get(f"ckpt_name_{i}") for i in range(1, ckpt_count + 1)]
            clip_skips = [kwargs.get(f"clip_skip_{i}") for i in range(1, ckpt_count + 1)]
            vaes = [kwargs.get(f"vae_name_{i}") for i in range(1, ckpt_count + 1)]

            # Set None for Clip Skip and/or VAE if not correct modes
            for i in range(ckpt_count):
                if "ClipSkip" not in input_mode:
                    clip_skips[i] = None
                if "VAE" not in input_mode:
                    vaes[i] = None

            xy_value = [(checkpoint, clip_skip, vae) for checkpoint, clip_skip, vae in zip(checkpoints, clip_skips, vaes) if
                        checkpoint != "None"]
        else:
            if batch_max == 0:
                return (None,)

            try:
                ckpts = get_batch_files(batch_path, CKPT_EXTENSIONS, include_subdirs=subdirectories)

                if not ckpts:
                    print(f"{error('XY Plot Error:')} No Checkpoint files found.")
                    return (None,)

                if batch_sort == "ascending":
                    ckpts.sort()
                elif batch_sort == "descending":
                    ckpts.sort(reverse=True)

                # Construct the xy_value using the obtained ckpts
                xy_value = [(ckpt, None, None) for ckpt in ckpts]

                if batch_max != -1:  # If there's a limit
                    xy_value = xy_value[:batch_max]

            except Exception as e:
                print(f"{error('XY Plot Error:')} {e}")
                return (None,)

        return ((xy_type, xy_value),) if xy_value else (None,)

```
