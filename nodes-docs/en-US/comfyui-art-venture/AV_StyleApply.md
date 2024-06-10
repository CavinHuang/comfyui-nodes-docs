---
tags:
- Style
---

# AV Style Apply
## Documentation
- Class name: `AV_StyleApply`
- Category: `Art Venture/Style`
- Output node: `False`

The AV_StyleApply node is designed to apply specific styles to given data, utilizing a model and a preset. It can optionally use a mask to refine the style application process and includes a toggle to enable or disable the styling function. This node is integral for customizing and enhancing visual content through the application of artistic or thematic styles.
## Input types
### Required
- **`model`**
    - The model parameter specifies the style model to be used for applying styles to the input data. It plays a crucial role in determining the final appearance of the styled content.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`preset`**
    - The preset parameter defines the specific style to be applied. It acts as a key to select among various predefined styles within the model, influencing the styling outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`data`**
    - The data parameter represents the input content to which the style will be applied. This could be an image or any form of visual data that is compatible with the model.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`weight`**
    - The weight parameter adjusts the intensity of the style applied to the input data, allowing for finer control over the styling effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - The weight_type parameter specifies the method of weighting the style application, affecting how the style intensity is calculated and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - The start_at parameter determines the starting point of style application in a sequence, enabling temporal control over the styling process in video or animated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - The end_at parameter sets the endpoint for style application in a sequence, allowing for precise control over the duration and timing of styling effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask`**
    - The mask parameter allows for selective application of the style to specific areas of the input data, enhancing the precision of the styling process.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
- **`enabled`**
    - The enabled parameter toggles the style application process on or off, providing control over whether the styling should be applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model output represents the styled model after the application of the specified style and adjustments.
    - Python dtype: `torch.nn.Module`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image output is the visual representation of the input data after the style has been applied, reflecting the chosen presets and adjustments.
    - Python dtype: `torch.Tensor`
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
