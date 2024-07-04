
# Documentation
- Class name: AV_ControlNetEfficientLoaderAdvanced
- Category: Art Venture/Loaders
- Output node: False

AV_ControlNetEfficientLoaderAdvanced节点是ControlNet加载器的高级版本，旨在高效加载和应用ControlNet配置，用于增强图像处理和生成任务。它扩展了基础加载器的功能，提供了更复杂的控制和优化选项，以处理和应用ControlNet模型。

# Input types
## Required
- control_net_name
    - 指定要加载的ControlNet的名称。此参数对于识别要应用的ControlNet模型至关重要，直接影响图像处理或生成过程的结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - ControlNet的正面条件输入，表示要在图像中增强或保持的所需属性或特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- negative
    - ControlNet的负面条件输入，表示要在图像中减弱或移除的属性或特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- image
    - 要由ControlNet处理的图像，作为应用条件效果的基础。
    - Comfy dtype: IMAGE
    - Python dtype: Any
- strength
    - 决定ControlNet对图像影响的强度，允许对处理进行精细调节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 指定效果应用的起始百分比，实现ControlNet的分阶段或渐进应用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 指定效果应用的结束百分比，允许对ControlNet影响进行受控结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preprocessor
    - 选择在应用ControlNet之前对图像进行预处理的处理器，影响最终结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- control_net_override
    - 允许覆盖选定的ControlNet模型。此参数提供了动态选择不同ControlNet模型的灵活性，可能增强节点适应各种场景的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- timestep_keyframe
    - 定义ControlNet应用的特定时间步或关键帧。此参数能够精确控制ControlNet效果的时机，允许更有针对性和有效的图像处理。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: Optional[str]
- resolution
    - 定义要处理的图像的分辨率，影响ControlNet应用的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- enabled
    - 启用或禁用ControlNet的应用，提供了在必要时绕过处理的机制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- positive
    - ControlNet应用后修改的正面条件，反映了增强或保持的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- negative
    - ControlNet应用后修改的负面条件，反映了减弱或移除的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientLoaderAdvanced(ControlNetApplyAdvanced):
    controlnets = folder_paths.get_filename_list("controlnet")
    preprocessors = list(control_net_preprocessors.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "control_net_name": (["None"] + s.controlnets,),
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "image": ("IMAGE",),
                "strength": (
                    "FLOAT",
                    {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01},
                ),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "preprocessor": (["None"] + s.preprocessors,),
            },
            "optional": {
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "enabled": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "load_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def load_controlnet(
        self,
        control_net_name,
        positive,
        negative,
        image,
        strength,
        start_percent,
        end_percent,
        preprocessor,
        control_net_override="None",
        timestep_keyframe=None,
        resolution=512,
        enabled=True,
    ):
        if not enabled:
            return (positive, negative)

        control_net = load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)
        if control_net is None:
            return (positive, negative)

        image = apply_preprocessor(image, preprocessor, resolution=resolution)

        return super().apply_controlnet(positive, negative, control_net, image, strength, start_percent, end_percent)

```
