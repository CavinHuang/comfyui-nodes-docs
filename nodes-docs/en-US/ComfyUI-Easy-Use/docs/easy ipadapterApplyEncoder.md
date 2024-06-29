---
tags:
- IPAdapter
---

# Easy Apply IPAdapter (Encoder)
## Documentation
- Class name: `easy ipadapterApplyEncoder`
- Category: `EasyUse/Adapter`
- Output node: `False`

The node 'easy ipadapterApplyEncoder' is designed to encode images using an IPAdapter, producing both positive and negative embeddings. It allows for the customization of embedding generation through various parameters, enabling a tailored approach to image encoding within a given model's context.
## Input types
### Required
- **`model`**
    - Specifies the model to which the IPAdapter encoding process will be applied, serving as the foundation for embedding generation.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`image1`**
    - The primary image input for encoding, which is essential for generating the corresponding embeddings.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`preset`**
    - Defines the preset configuration to be used during the encoding process, influencing the characteristics of the generated embeddings.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`num_embeds`**
    - Determines the number of embeddings to be generated, affecting the depth of the encoding process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image2`**
    - The second image input for encoding, optional based on 'num_embeds', contributing to the diversity of generated embeddings.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image3`**
    - The third image input for encoding, optional based on 'num_embeds', further diversifying the embedding output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask1`**
    - Optional mask for the first image, guiding the focus of the encoding process.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`weight1`**
    - Weight for the first image's influence on the embedding, allowing for customized emphasis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask2`**
    - Optional mask for the second image, if provided, to refine the encoding focus.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`weight2`**
    - Weight for the second image's embedding, customizable for balanced or biased emphasis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask3`**
    - Optional mask for the third image, if provided, for further encoding refinement.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`weight3`**
    - Weight for the third image's embedding, enabling emphasis customization.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`combine_method`**
    - Method to combine multiple embeddings, influencing the final embedding outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`optional_ipadapter`**
    - An optional IPAdapter to be used, offering flexibility in the encoding process.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `torch.nn.Module`
- **`pos_embeds`**
    - Accumulated positive embeddings from the encoding process, reflecting the positive aspects of the images.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `List[torch.Tensor]`
- **`neg_embeds`**
    - Accumulated negative embeddings from the encoding process, reflecting the negative aspects of the images.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the model after applying the IPAdapter encoding process, potentially modified with new embeddings.
    - Python dtype: `torch.nn.Module`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - Provides the IPAdapter used in the encoding process, reflecting any adjustments made during embedding generation.
    - Python dtype: `torch.nn.Module`
- **`pos_embed`**
    - Comfy dtype: `EMBEDS`
    - The combined positive embeddings resulting from the encoding process, ready for further application.
    - Python dtype: `torch.Tensor`
- **`neg_embed`**
    - Comfy dtype: `EMBEDS`
    - The combined negative embeddings resulting from the encoding process, ready for further application.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ipadapterApplyEncoder(ipadapter):
    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        normal_presets = ipa_cls.normal_presets
        max_embeds_num = 3
        inputs = {
            "required": {
                "model": ("MODEL",),
                "image1": ("IMAGE",),
                "preset": (normal_presets,),
                "num_embeds":  ("INT", {"default": 2, "min": 1, "max": max_embeds_num}),
            },
            "optional": {}
        }

        for i in range(1, max_embeds_num + 1):
            if i > 1:
                inputs["optional"][f"image{i}"] = ("IMAGE",)
        for i in range(1, max_embeds_num + 1):
            inputs["optional"][f"mask{i}"] = ("MASK",)
            inputs["optional"][f"weight{i}"] = ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05})
        inputs["optional"]["combine_method"] = (["concat", "add", "subtract", "average", "norm average", "max", "min"],)
        inputs["optional"]["optional_ipadapter"] = ("IPADAPTER",)
        inputs["optional"]["pos_embeds"] = ("EMBEDS",)
        inputs["optional"]["neg_embeds"] = ("EMBEDS",)
        return inputs

    RETURN_TYPES = ("MODEL", "IPADAPTER", "EMBEDS", "EMBEDS", )
    RETURN_NAMES = ("model", "ipadapter", "pos_embed", "neg_embed", )
    CATEGORY = "EasyUse/Adapter"
    FUNCTION = "apply"

    def batch(self, embeds, method):
        if method == 'concat' and len(embeds) == 1:
            return (embeds[0],)

        embeds = [embed for embed in embeds if embed is not None]
        embeds = torch.cat(embeds, dim=0)

        match method:
            case "add":
                embeds = torch.sum(embeds, dim=0).unsqueeze(0)
            case "subtract":
                embeds = embeds[0] - torch.mean(embeds[1:], dim=0)
                embeds = embeds.unsqueeze(0)
            case "average":
                embeds = torch.mean(embeds, dim=0).unsqueeze(0)
            case "norm average":
                embeds = torch.mean(embeds / torch.norm(embeds, dim=0, keepdim=True), dim=0).unsqueeze(0)
            case "max":
                embeds = torch.max(embeds, dim=0).values.unsqueeze(0)
            case "min":
                embeds = torch.min(embeds, dim=0).values.unsqueeze(0)

        return embeds

    def apply(self, **kwargs):
        model = kwargs['model']
        preset = kwargs['preset']
        if 'optional_ipadapter' in kwargs:
            ipadapter = kwargs['optional_ipadapter']
        else:
            model, ipadapter = self.load_model(model, preset, 0, 'CPU', clip_vision=None, optional_ipadapter=None, cache_mode='none')

        if "IPAdapterEncoder" not in ALL_NODE_CLASS_MAPPINGS:
            self.error()
        encoder_cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterEncoder"]

        pos_embeds = kwargs["pos_embeds"] if "pos_embeds" in kwargs else []
        neg_embeds = kwargs["neg_embeds"] if "neg_embeds" in kwargs else []
        for i in range(1, kwargs['num_embeds'] + 1):
            if f"image{i}" not in kwargs:
                raise Exception(f"image{i} is required")
            kwargs[f"mask{i}"] = kwargs[f"mask{i}"] if f"mask{i}" in kwargs else None
            kwargs[f"weight{i}"] = kwargs[f"weight{i}"] if f"weight{i}" in kwargs else 1.0

            pos, neg = encoder_cls().encode(ipadapter, kwargs[f"image{i}"], kwargs[f"weight{i}"], kwargs[f"mask{i}"], clip_vision=None)
            pos_embeds.append(pos)
            neg_embeds.append(neg)

        pos_embeds = self.batch(pos_embeds, kwargs['combine_method'])
        neg_embeds = self.batch(neg_embeds, kwargs['combine_method'])

        return (model, ipadapter, pos_embeds, neg_embeds)

```
