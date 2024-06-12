---
tags:
- Loader
---

# PhotoMakerEncode
## Documentation
- Class name: `PhotoMakerEncode`
- Category: `_for_testing/photomaker`
- Output node: `False`

The PhotoMakerEncode node is designed to integrate visual information from images with textual embeddings, enhancing the latter with visual context. This process involves projecting image pixel values into an embedding space, merging these with existing text prompt embeddings, and applying a fusion module to effectively blend the visual and textual information.
## Input types
### Required
- **`photomaker`**
    - Specifies the photomaker model to be used for encoding the visual information from images into a format that can be integrated with text embeddings.
    - Comfy dtype: `PHOTOMAKER`
    - Python dtype: `PhotoMakerIDEncoder`
- **`image`**
    - The image input whose visual information is to be encoded and integrated with text embeddings.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clip`**
    - The CLIP model used for text tokenization and encoding, facilitating the integration of visual information with textual context.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIPModel`
- **`text`**
    - The text input that provides the context or description for the image, which will be enhanced with visual information.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output after integrating visual information from the image with the text embeddings, resulting in a conditioning vector that combines both textual and visual cues.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PhotoMakerEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "photomaker": ("PHOTOMAKER",),
                              "image": ("IMAGE",),
                              "clip": ("CLIP", ),
                              "text": ("STRING", {"multiline": True, "dynamicPrompts": True, "default": "photograph of photomaker"}),
                             }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply_photomaker"

    CATEGORY = "_for_testing/photomaker"

    def apply_photomaker(self, photomaker, image, clip, text):
        special_token = "photomaker"
        pixel_values = comfy.clip_vision.clip_preprocess(image.to(photomaker.load_device)).float()
        try:
            index = text.split(" ").index(special_token) + 1
        except ValueError:
            index = -1
        tokens = clip.tokenize(text, return_word_ids=True)
        out_tokens = {}
        for k in tokens:
            out_tokens[k] = []
            for t in tokens[k]:
                f = list(filter(lambda x: x[2] != index, t))
                while len(f) < len(t):
                    f.append(t[-1])
                out_tokens[k].append(f)

        cond, pooled = clip.encode_from_tokens(out_tokens, return_pooled=True)

        if index > 0:
            token_index = index - 1
            num_id_images = 1
            class_tokens_mask = [True if token_index <= i < token_index+num_id_images else False for i in range(77)]
            out = photomaker(id_pixel_values=pixel_values.unsqueeze(0), prompt_embeds=cond.to(photomaker.load_device),
                            class_tokens_mask=torch.tensor(class_tokens_mask, dtype=torch.bool, device=photomaker.load_device).unsqueeze(0))
        else:
            out = cond

        return ([[out, {"pooled_output": pooled}]], )

```
