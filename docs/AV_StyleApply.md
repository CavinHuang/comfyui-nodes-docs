
# Documentation
- Class name: AV_StyleApply
- Category: Art Venture/Style
- Output node: False

AV_StyleApply节点用于将特定样式应用于给定数据，利用模型和预设来实现。它可以选择性地使用蒙版来优化样式应用过程，并包含一个开关来启用或禁用样式功能。该节点对于通过应用艺术或主题样式来定制和增强视觉内容至关重要。

# Input types
## Required
- model
    - model参数指定用于将样式应用于输入数据的样式模型。它在决定样式化内容的最终外观方面起着至关重要的作用。
    - Comfy dtype: MODEL
    - Python dtype: str
- preset
    - preset参数定义要应用的具体样式。它作为一个键来选择模型中的各种预定义样式，从而影响样式化的结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- data
    - data参数表示将要应用样式的输入内容。这可以是图像或任何与模型兼容的视觉数据形式。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - weight参数调整应用于输入数据的样式强度，允许对样式效果进行更精细的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - weight_type参数指定样式应用的权重方法，影响样式强度的计算和应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- start_at
    - start_at参数确定在序列中开始应用样式的起点，使视频或动画内容的样式化过程能够进行时间控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数设置序列中样式应用的终点，允许精确控制样式效果的持续时间和时机。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- mask
    - mask参数允许将样式选择性地应用于输入数据的特定区域，提高样式化过程的精确度。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]
- enabled
    - enabled参数切换样式应用过程的开启或关闭，提供对是否应用样式的控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- model
    - 模型输出代表应用了指定样式和调整后的样式化模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- image
    - 图像输出是样式应用后输入数据的视觉表现，反映了所选预设和调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class AV_StyleApply:
        @classmethod
        def INPUT_TYPES(cls):
            return {
                "required": {
                    "model": ("MODEL",),
                    "preset": (PRESETS,),
                    "data": (
                        "STRING",
                        {
                            "placeholder": '[{"url": "http://domain/path/image.png", "weight": 1}]',
                            "multiline": True,
                            "dynamicPrompts": False,
                        },
                    ),
                    "weight": ("FLOAT", {"default": 0.5, "min": -1, "max": 3, "step": 0.05}),
                    "weight_type": (WEIGHT_TYPES,),
                    "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                },
                "optional": {
                    "mask": ("MASK",),
                    "enabled": ("BOOLEAN", {"default": True}),
                },
            }

        RETURN_TYPES = ("MODEL", "IMAGE")
        CATEGORY = "Art Venture/Style"
        FUNCTION = "apply_style"

        def apply_style(self, model, preset: str, data: str, mask=None, enabled=True, **kwargs):
            data = json.loads(data or "[]")
            data: IPAdapterData = IPAdapterData(images=data)  # validate

            if len(data.images) == 0:
                images = torch.zeros((1, 64, 64, 3))
                return (model, images)

            (model, pipeline) = unifyLoader.load_models(model, preset)

            urls = [image.url for image in data.images]
            pils, _ = load_images_from_url(urls)

            embeds_avg = None
            neg_embeds_avg = None
            images = []

            for i, pil in enumerate(pils):
                weight = data.images[i].weight
                image = pil2tensor(pil)
                if i > 0 and image.shape[1:] != images[0].shape[1:]:
                    image = comfy.utils.common_upscale(
                        image.movedim(-1, 1), images[0].shape[2], images[0].shape[1], "bilinear", "center"
                    ).movedim(1, -1)
                images.append(image)

                embeds = encoder.encode(pipeline, image, weight, mask=mask)
                if embeds_avg is None:
                    embeds_avg = embeds[0]
                    neg_embeds_avg = embeds[1]
                else:
                    embeds_avg = combiner.batch(embeds_avg, method="average", embed2=embeds[0])[0]
                    neg_embeds_avg = combiner.batch(neg_embeds_avg, method="average", embed2=embeds[1])[0]

            images = torch.cat(images)

            model = embedder.apply_ipadapter(model, pipeline, embeds_avg, neg_embed=neg_embeds_avg, **kwargs)[0]

            return (model, images)

```
