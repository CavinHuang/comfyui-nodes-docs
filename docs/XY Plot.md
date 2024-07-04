
# Documentation
- Class name: XY Plot
- Category: Efficiency Nodes/Scripts
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

XY Plot节点旨在生成和操作XY图表，基于各种参数和条件。它支持多种操作，如翻转坐标轴、调整标签方向、缓存模型以及处理图表生成的唯一标识符。这个节点在处理和可视化结构化XY图表格式的数据方面非常灵活，可以适应不同类型的图表输入和配置。

# Input types
## Required
- grid_spacing
    - 指定图表中网格线之间的间距，影响图表的粒度和视觉密度。
    - Comfy dtype: INT
    - Python dtype: int
- XY_flip
    - 一个布尔参数，决定是否翻转X和Y轴，从而改变图表的方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- Y_label_orientation
    - 控制Y轴标签的方向，根据图表的布局和呈现方式增强可读性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cache_models
    - 指示是否缓存模型数据以提高效率，减少重复生成图表时的加载时间。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- ksampler_output_image
    - 来自ksampler的输出图像，用作XY图表的参考或基础。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- dependencies
    - 图表生成所需的可选依赖项，如额外的数据源或配置。
    - Comfy dtype: DEPENDENCIES
    - Python dtype: Dict[str, Any]
- X
    - 图表的X轴值或数据点，如果连接了可以解包为元组。
    - Comfy dtype: XY
    - Python dtype: Tuple[float, ...]
- Y
    - 图表的Y轴值或数据点，与X类似，如果连接了可以解包为元组。
    - Comfy dtype: XY
    - Python dtype: Tuple[float, ...]

# Output types
- SCRIPT
    - 返回一个包含XY图表脚本配置的字典，包括图表参数和数据点。
    - Comfy dtype: SCRIPT
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)



## Source code
```python
class TSC_XYplot:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "grid_spacing": ("INT", {"default": 0, "min": 0, "max": 500, "step": 5}),
                    "XY_flip": (["False","True"],),
                    "Y_label_orientation": (["Horizontal", "Vertical"],),
                    "cache_models": (["True", "False"],),
                    "ksampler_output_image": (["Images","Plot"],),},
                "optional": {
                    "dependencies": ("DEPENDENCIES", ),
                    "X": ("XY", ),
                    "Y": ("XY", ),},
                "hidden": {"my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("SCRIPT",)
    RETURN_NAMES = ("SCRIPT",)
    FUNCTION = "XYplot"
    CATEGORY = "Efficiency Nodes/Scripts"

    def XYplot(self, grid_spacing, XY_flip, Y_label_orientation, cache_models, ksampler_output_image, my_unique_id,
               dependencies=None, X=None, Y=None):

        # Unpack X & Y Tuples if connected
        if X != None:
            X_type, X_value  = X
        else:
            X_type = "Nothing"
            X_value = [""]
        if Y != None:
            Y_type, Y_value = Y
        else:
            Y_type = "Nothing"
            Y_value = [""]

        # If types are the same exit. If one isn't "Nothing", print error
        if X_type != "XY_Capsule" and (X_type == Y_type) and X_type not in ["Positive Prompt S/R", "Negative Prompt S/R"]:
            if X_type != "Nothing":
                print(f"{error('XY Plot Error:')} X and Y input types must be different.")
            return (None,)

        # Check that dependencies are connected for specific plot types
        encode_types = {
            "Checkpoint", "Refiner",
            "LoRA", "LoRA Batch", "LoRA Wt", "LoRA MStr", "LoRA CStr",
            "Positive Prompt S/R", "Negative Prompt S/R",
            "AScore+", "AScore-",
            "Clip Skip", "Clip Skip (Refiner)",
            "ControlNetStrength", "ControlNetStart%", "ControlNetEnd%"
        }

        if X_type in encode_types or Y_type in encode_types:
            if dependencies is None:  # Not connected
                print(f"{error('XY Plot Error:')} The dependencies input must be connected for certain plot types.")
                # Return None
                return (None,)

        # Check if both X_type and Y_type are special lora_types
        lora_types = {"LoRA Batch", "LoRA Wt", "LoRA MStr", "LoRA CStr"}
        if (X_type in lora_types and Y_type not in lora_types) or (Y_type in lora_types and X_type not in lora_types):
            print(
                f"{error('XY Plot Error:')} Both X and Y must be connected to use the 'LoRA Plot' node.")
            return (None,)

        # Clean Schedulers from Sampler data (if other type is Scheduler)
        if X_type == "Sampler" and Y_type == "Scheduler":
            # Clear X_value Scheduler's
            X_value = [(x[0], "") for x in X_value]
        elif Y_type == "Sampler" and X_type == "Scheduler":
            # Clear Y_value Scheduler's
            Y_value = [(y[0], "") for y in Y_value]

        # Embed information into "Scheduler" X/Y_values for text label
        if X_type == "Scheduler" and Y_type != "Sampler":
            # X_value second tuple value of each array entry = None
            X_value = [(x, None) for x in X_value]

        if Y_type == "Scheduler" and X_type != "Sampler":
            # Y_value second tuple value of each array entry = None
            Y_value = [(y, None) for y in Y_value]

        # Clean VAEs from Checkpoint data if other type is VAE
        if X_type == "Checkpoint" and Y_type == "VAE":
            # Clear X_value VAE's
            X_value = [(t[0], t[1], None) for t in X_value]
        elif Y_type == "VAE" and X_type == "Checkpoint":
            # Clear Y_value VAE's
            Y_value = [(t[0], t[1], None) for t in Y_value]

        # Flip X and Y
        if XY_flip == "True":
            X_type, Y_type = Y_type, X_type
            X_value, Y_value = Y_value, X_value
            
        # Define Ksampler output image behavior
        xyplot_as_output_image = ksampler_output_image == "Plot"

        # Pack xyplot tuple into its dictionary item under script
        script = {"xyplot": (X_type, X_value, Y_type, Y_value, grid_spacing, Y_label_orientation, cache_models,
                        xyplot_as_output_image, my_unique_id, dependencies)}

        return (script,)

```
