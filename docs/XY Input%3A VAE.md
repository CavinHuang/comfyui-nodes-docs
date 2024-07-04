
# Documentation
- Class name: XY Input: VAE
- Category: Efficiency Nodes/XY Inputs
- Output node: False

本节点旨在简化VAE（变分自编码器）模型在生成艺术流程中的集成和操作。它专门用于基于VAE特性生成或转换图像，抽象了处理VAE模型的复杂性，包括加载、编码和解码操作，以简化视觉内容的创建过程。

# Input types
## Required
- input_mode
    - 指定输入模式，决定VAE模型是单独加载还是批量处理，这影响了VAE文件在流程中的处理和使用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_path
    - 指向包含批量VAE文件的目录的文件系统路径。当'input_mode'设置为批处理时使用，使节点能够定位和操作多个VAE模型。
    - Comfy dtype: STRING
    - Python dtype: str
- subdirectories
    - 布尔标志，指示在批处理期间是否包括'batch_path'内子目录中的VAE文件，扩大了要考虑的VAE模型范围。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- batch_sort
    - 决定批处理模式下VAE文件的处理顺序，支持升序或降序排序，影响VAE模型使用的顺序。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_max
    - 设置批处理模式下要处理的VAE文件数量限制，允许控制操作中包含的VAE模型的最大数量。
    - Comfy dtype: INT
    - Python dtype: int
- vae_count
    - 指定非批处理模式下要加载和处理的单个VAE模型数量，指导节点预期处理的VAE模型数量。
    - Comfy dtype: INT
    - Python dtype: int
- vae_name_i
    - 在非批处理模式下通过名称标识每个单独的VAE模型，允许选择和加载特定的VAE模型进行处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- X or Y
    - 输出代表由节点处理或生成的'X'或'Y'值，通常与VAE模型的数据或特征相关。
    - Comfy dtype: XY
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_VAE:

    modes = ["VAE Names", "VAE Batch"]

    @classmethod
    def INPUT_TYPES(cls):

        vaes = ["None", "Baked VAE"] + folder_paths.get_filename_list("vae")

        inputs = {
            "required": {
                        "input_mode": (cls.modes,),
                        "batch_path": ("STRING", {"default": xy_batch_default_path, "multiline": False}),
                        "subdirectories": ("BOOLEAN", {"default": False}),
                        "batch_sort": (["ascending", "descending"],),
                        "batch_max": ("INT", {"default": -1, "min": -1, "max": XYPLOT_LIM, "step": 1}),
                        "vae_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM, "step": 1})
            }
        }

        for i in range(1, XYPLOT_LIM+1):
            inputs["required"][f"vae_name_{i}"] = (vaes,)

        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, input_mode, batch_path, subdirectories, batch_sort, batch_max, vae_count, **kwargs):

        xy_type = "VAE"

        if "Batch" not in input_mode:
            # Extract values from kwargs
            vaes = [kwargs.get(f"vae_name_{i}") for i in range(1, vae_count + 1)]
            xy_value = [vae for vae in vaes if vae != "None"]
        else:
            if batch_max == 0:
                return (None,)

            try:
                vaes = get_batch_files(batch_path, VAE_EXTENSIONS, include_subdirs=subdirectories)

                if not vaes:
                    print(f"{error('XY Plot Error:')} No VAE files found.")
                    return (None,)

                if batch_sort == "ascending":
                    vaes.sort()
                elif batch_sort == "descending":
                    vaes.sort(reverse=True)

                # Construct the xy_value using the obtained vaes
                xy_value = [vae for vae in vaes]

                if batch_max != -1:  # If there's a limit
                    xy_value = xy_value[:batch_max]

            except Exception as e:
                print(f"{error('XY Plot Error:')} {e}")
                return (None,)

        return ((xy_type, xy_value),) if xy_value else (None,)

```
