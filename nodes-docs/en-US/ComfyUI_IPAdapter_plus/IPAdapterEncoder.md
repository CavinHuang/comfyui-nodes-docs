---
tags:
- IPAdapter
---

# IPAdapter Encoder
## Documentation
- Class name: `IPAdapterEncoder`
- Category: `ipadapter/embeds`
- Output node: `False`

The IPAdapterEncoder node is designed to encode images with specific adaptations, leveraging additional parameters such as weight and mask to fine-tune the encoding process. It aims to enhance image processing tasks by integrating clip vision capabilities and custom adaptations.
## Input types
### Required
- **`ipadapter`**
    - Represents the IPAdapter instance to be used for encoding, determining the specific adaptation techniques applied to the image.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `CustomIPAdapterType`
- **`image`**
    - The image to be encoded, serving as the primary input for the adaptation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `ImageType`
- **`weight`**
    - A weight factor that influences the encoding process, allowing for fine-tuning of the adaptation effects on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask`**
    - An optional mask that can be applied to the image, enabling selective encoding of certain image regions.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[ImageType]`
- **`clip_vision`**
    - An optional parameter to incorporate clip vision features into the encoding, enhancing the adaptation with vision-based insights.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `Optional[ClipVisionType]`
## Output types
- **`pos_embed`**
    - Comfy dtype: `EMBEDS`
    - The positive embedding result of the encoding process.
    - Python dtype: `EmbeddingType`
- **`neg_embed`**
    - Comfy dtype: `EMBEDS`
    - The negative embedding result of the encoding process.
    - Python dtype: `EmbeddingType`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - IPAdapterApplyEncoded



## Source code
```python
class IPAdapterEncoder:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "ipadapter": ("IPADAPTER",),
            "image": ("IMAGE",),
            "weight": ("FLOAT", { "default": 1.0, "min": -1.0, "max": 3.0, "step": 0.01 }),
            },
            "optional": {
                "mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
            }
        }

    RETURN_TYPES = ("EMBEDS", "EMBEDS",)
    RETURN_NAMES = ("pos_embed", "neg_embed",)
    FUNCTION = "encode"
    CATEGORY = "ipadapter/embeds"

    def encode(self, ipadapter, image, weight, mask=None, clip_vision=None):
        if 'ipadapter' in ipadapter:
            ipadapter_model = ipadapter['ipadapter']['model']
            clip_vision = clip_vision if clip_vision is not None else ipadapter['clipvision']['model']
        else:
            ipadapter_model = ipadapter
            clip_vision = clip_vision

        if clip_vision is None:
            raise Exception("Missing CLIPVision model.")

        is_plus = "proj.3.weight" in ipadapter_model["image_proj"] or "latents" in ipadapter_model["image_proj"] or "perceiver_resampler.proj_in.weight" in ipadapter_model["image_proj"]

        # resize and crop the mask to 224x224
        if mask is not None and mask.shape[1:3] != torch.Size([224, 224]):
            mask = mask.unsqueeze(1)
            transforms = T.Compose([
                T.CenterCrop(min(mask.shape[2], mask.shape[3])),
                T.Resize((224, 224), interpolation=T.InterpolationMode.BICUBIC, antialias=True),
            ])
            mask = transforms(mask).squeeze(1)
            #mask = T.Resize((image.shape[1], image.shape[2]), interpolation=T.InterpolationMode.BICUBIC, antialias=True)(mask.unsqueeze(1)).squeeze(1)

        img_cond_embeds = encode_image_masked(clip_vision, image, mask)

        if is_plus:
            img_cond_embeds = img_cond_embeds.penultimate_hidden_states
            img_uncond_embeds = encode_image_masked(clip_vision, torch.zeros([1, 224, 224, 3])).penultimate_hidden_states
        else:
            img_cond_embeds = img_cond_embeds.image_embeds
            img_uncond_embeds = torch.zeros_like(img_cond_embeds)

        if weight != 1:
            img_cond_embeds = img_cond_embeds * weight

        return (img_cond_embeds, img_uncond_embeds, )

```
