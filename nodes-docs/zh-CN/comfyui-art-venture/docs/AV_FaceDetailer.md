
# Documentation
- Class name: AV_FaceDetailer
- Category: ArtVenture/Detailer
- Output node: False

AV_FaceDetailer 节点旨在增强图像中的面部细节。它属于 ArtVenture/Detailer 类别,利用先进的细节处理技术来改善面部特征。该节点提供了一个可选的开关,允许用户启用或禁用这个增强过程。

# Input types
## Required
- image
    - 输入的源图像,将在其上进行面部细节增强。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- model
    - 用于面部细节增强的模型。
    - Comfy dtype: MODEL
    - Python dtype: unknown
- clip
    - 用于图像处理的 CLIP 模型。
    - Comfy dtype: CLIP
    - Python dtype: unknown
- vae
    - 用于图像处理的 VAE 模型。
    - Comfy dtype: VAE
    - Python dtype: unknown
- guide_size
    - 指导图像的大小参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- guide_size_for
    - 指导图像大小的适用对象。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- max_size
    - 处理图像的最大尺寸限制。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- seed
    - 随机种子,用于确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: unknown
- steps
    - 处理步骤数。
    - Comfy dtype: INT
    - Python dtype: unknown
- cfg
    - 配置参数,可能影响处理的强度或方式。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sampler_name
    - 使用的采样器名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- scheduler
    - 使用的调度器类型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- positive
    - 正面提示条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- negative
    - 负面提示条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- denoise
    - 去噪强度参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- feather
    - 羽化效果的强度。
    - Comfy dtype: INT
    - Python dtype: unknown
- noise_mask
    - 是否使用噪声遮罩。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- force_inpaint
    - 是否强制执行修复绘制。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- bbox_threshold
    - 边界框检测的阈值。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- bbox_dilation
    - 边界框扩张参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- bbox_crop_factor
    - 边界框裁剪因子。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_detection_hint
    - SAM (Segment Anything Model) 检测提示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- sam_dilation
    - SAM 膨胀参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- sam_threshold
    - SAM 阈值参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_bbox_expansion
    - SAM 边界框扩展参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- sam_mask_hint_threshold
    - SAM 遮罩提示阈值。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sam_mask_hint_use_negative
    - SAM 遮罩提示是否使用负面信息。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- drop_size
    - 丢弃的大小参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- bbox_detector
    - 边界框检测器。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: unknown
- wildcard
    - 通配符参数,可能用于灵活配置。
    - Comfy dtype: STRING
    - Python dtype: unknown
- cycle
    - 处理循环次数。
    - Comfy dtype: INT
    - Python dtype: unknown

## Optional
- sam_model_opt
    - 可选的 SAM 模型。
    - Comfy dtype: SAM_MODEL
    - Python dtype: unknown
- segm_detector_opt
    - 可选的分割检测器。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: unknown
- detailer_hook
    - 细节处理器钩子。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: unknown
- inpaint_model
    - 是否使用修复绘制模型。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown
- noise_mask_feather
    - 噪声遮罩的羽化参数。
    - Comfy dtype: INT
    - Python dtype: unknown
- enabled
    - 此参数允许用户启用或禁用面部细节处理过程,为图像处理提供了灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 处理后的图像输出。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- cropped_refined
    - 精细化后的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- cropped_enhanced_alpha
    - 带有增强 alpha 通道的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- mask
    - 处理过程中生成的遮罩。
    - Comfy dtype: MASK
    - Python dtype: unknown
- detailer_pipe
    - 细节处理管道的输出。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: unknown
- cnet_images
    - 控制网络相关的图像输出。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- ui
    - 输出包括原始图像(如果启用了面部细节增强)以及额外的处理信息。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class AV_FaceDetailer(FaceDetailer):
        @classmethod
        def INPUT_TYPES(s):
            inputs = FaceDetailer.INPUT_TYPES()
            inputs["optional"]["enabled"] = (
                "BOOLEAN",
                {"default": True, "label_on": "enabled", "label_off": "disabled"},
            )
            return inputs

        CATEGORY = "ArtVenture/Detailer"

        def args_to_pipe(self, args: dict):
            hook_args = [
                "model",
                "clip",
                "vae",
                "positive",
                "negative",
                "wildcard",
                "bbox_detector",
                "segm_detector_opt",
                "sam_model_opt",
                "detailer_hook",
            ]

            pipe_args = []
            for arg in hook_args:
                pipe_args.append(args.get(arg, None))

            return tuple(pipe_args + [None, None, None, None])

        def doit(self, image, *args, enabled=True, **kwargs):
            if enabled:
                return super().doit(image, *args, **kwargs)
            else:
                pipe = self.args_to_pipe(kwargs)
                return (image, [], [], None, pipe, [])

```
