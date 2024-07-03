
# Documentation
- Class name: BuildColorRangeAdvanced (hsv)
- Category: Bmad/CV/Color A.
- Output node: False

BuildColorRangeAdvanced (hsv) 节点旨在 HSV 色彩空间中创建全面的颜色范围。它利用先进技术精确定义和调整颜色范围的边界，确保在各种计算机视觉任务中进行精确的颜色选择和操作。

# Input types
## Required
- samples
    - 'samples' 参数代表 HSV 色彩空间中的数据点或颜色样本，节点将使用这些样本来确定范围。它对于定义要生成的颜色范围的范围至关重要。
    - Comfy dtype: HSV_SAMPLES
    - Python dtype: numpy.ndarray
- hue_exp
    - 'hue_exp' 参数用于调整颜色范围的色相分量，影响最终的颜色选择。
    - Comfy dtype: STRING
    - Python dtype: float
- sat_exp
    - 'sat_exp' 参数用于调整颜色范围的饱和度分量，影响最终的颜色选择。
    - Comfy dtype: STRING
    - Python dtype: float
- val_exp
    - 'val_exp' 参数用于调整颜色范围的明度分量，影响最终的颜色选择。
    - Comfy dtype: STRING
    - Python dtype: float

# Output types
- hsv_color
    - 'hsv_color' 输出代表在 HSV 色彩空间中生成的颜色范围。它对于需要精确颜色操作和选择的应用至关重要。
    - Comfy dtype: HSV_COLOR
    - Python dtype: tuple
- combo[string]
    - 'combo[string]' 输出提供有关生成的颜色范围的附加信息或元数据，增强了节点在复杂颜色分析任务中的实用性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- ui
    - 'ui' 参数提供了一个用户界面组件，用于与节点的输出进行交互，提高了可用性和可访问性。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BuildColorRangeHSVAdvanced:
    def __init__(self):
        self.samples = None

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            # "average": ("HSV_COLOR",), # compute from sample?
            "samples": ("HSV_SAMPLES",),
            "hue_exp": ("STRING", {"multiline": True, "default": s.default_hue_expression}),
            "sat_exp": ("STRING", {"multiline": True, "default": s.default_saturation_expression}),
            "val_exp": ("STRING", {"multiline": True, "default": s.default_value_expression}),
        }}

    RETURN_TYPES = ("HSV_COLOR", "HSV_COLOR", InRangeHSV.hue_modes)
    FUNCTION = "get_interval"
    CATEGORY = "Bmad/CV/Color A."

    default_hue_expression = """# hue
h_quant2(0, 1).scale_by_constant(16) if 2 < v_median < 253 else to_interval(0, 180)
    """
    default_saturation_expression = """# saturation
to_interval(5, 255) if 2 < v_median < 253 else s_quant2(0,1).interpolate(0.2, [0, 255])
    """
    default_value_expression = """# value
v_quant2(0,1).interpolate(.5, [0, 255]).scale_by_constant(50) if 2 < v_median < 253 else v_quant2(0,1).scale_by_constant(8)
    """

    def get_interval(self, samples, hue_exp, sat_exp, val_exp):
        self.samples = samples

        # function to get sample names to include (avoids pre computing everything)
        # this supposes some computations could take considerable time, thus avoiding them if not used
        def valid_token(token: str):
            return token in samples_names and (
                    token.startswith("h_") or token.startswith("s_") or token.startswith("v_") or
                    token == "to_interval" or token == "minmax" or token == "maxmin"
            )

        # get bounds from the eval expressions
        bounds = {}
        samples_names = dir(samples)
        for key, expression in {"h": hue_exp, "s": sat_exp, "v": val_exp}.items():
            expression = prepare_text_for_eval(expression)  # purge potentially dangerous tokens

            locals_to_include_names = filter_expression_names(valid_token, expression)
            locals_to_include = {
                name: getattr(samples, name)
                for name in locals_to_include_names
            }

            bounds[key] = eval(expression, {
                "__builtins__": {},
                'min': min, 'max': max, 'm': math,
                **locals_to_include
            }, {})

        # get 2 colors that represent the computed lower and upper bounds
        lower_bounds = np.array([bounds.get("h")[0], bounds.get("s")[0], bounds.get("v")[0]]).round()
        upper_bounds = np.array([bounds.get("h")[1], bounds.get("s")[1], bounds.get("v")[1]]).round()
        hue_mode = BuildColorRangeHSV.fix_bounds(lower_bounds, upper_bounds)
        return (upper_bounds, lower_bounds, hue_mode)

```
