---
tags:
- ImageFilter
- VisualEffects
---

# Image Style Filter
## Documentation
- Class name: `Image Style Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node applies a specific style filter to an image, transforming its appearance to match a chosen aesthetic or visual theme. It leverages the capabilities of the Pilgram library to achieve various stylistic effects, offering a way to creatively alter the visual characteristics of images.
## Input types
### Required
- **`image`**
    - The image to which the style filter will be applied. It serves as the primary input for the transformation process, determining the base upon which the style filter operates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`style`**
    - The specific style to be applied to the image. This parameter defines the aesthetic or visual theme that the image will be transformed to match, playing a crucial role in the style filtering process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed image with the applied style filter. This output reflects the visual changes made to the original image, showcasing the new stylistic appearance.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Style_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "style": ([
                    "1977",
                    "aden",
                    "brannan",
                    "brooklyn",
                    "clarendon",
                    "earlybird",
                    "fairy tale",
                    "gingham",
                    "hudson",
                    "inkwell",
                    "kelvin",
                    "lark",
                    "lofi",
                    "maven",
                    "mayfair",
                    "moon",
                    "nashville",
                    "perpetua",
                    "reyes",
                    "rise",
                    "slumber",
                    "stinson",
                    "toaster",
                    "valencia",
                    "walden",
                    "willow",
                    "xpro2"
                ],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_style_filter"

    CATEGORY = "WAS Suite/Image/Filter"

    def image_style_filter(self, image, style):

        # Install Pilgram
        if 'pilgram' not in packages():
            install_package('pilgram')

        # Import Pilgram module
        import pilgram

        # WAS Filters
        WTools = WAS_Tools_Class()

        # Apply blending
        tensors = []
        for img in image:
            if style == "1977":
                tensors.append(pil2tensor(pilgram._1977(tensor2pil(img))))
            elif style == "aden":
                tensors.append(pil2tensor(pilgram.aden(tensor2pil(img))))
            elif style == "brannan":
                tensors.append(pil2tensor(pilgram.brannan(tensor2pil(img))))
            elif style == "brooklyn":
                tensors.append(pil2tensor(pilgram.brooklyn(tensor2pil(img))))
            elif style == "clarendon":
                tensors.append(pil2tensor(pilgram.clarendon(tensor2pil(img))))
            elif style == "earlybird":
                tensors.append(pil2tensor(pilgram.earlybird(tensor2pil(img))))
            elif style == "fairy tale":
                tensors.append(pil2tensor(WTools.sparkle(tensor2pil(img))))
            elif style == "gingham":
                tensors.append(pil2tensor(pilgram.gingham(tensor2pil(img))))
            elif style == "hudson":
                tensors.append(pil2tensor(pilgram.hudson(tensor2pil(img))))
            elif style == "inkwell":
                tensors.append(pil2tensor(pilgram.inkwell(tensor2pil(img))))
            elif style == "kelvin":
                tensors.append(pil2tensor(pilgram.kelvin(tensor2pil(img))))
            elif style == "lark":
                tensors.append(pil2tensor(pilgram.lark(tensor2pil(img))))
            elif style == "lofi":
                tensors.append(pil2tensor(pilgram.lofi(tensor2pil(img))))
            elif style == "maven":
                tensors.append(pil2tensor(pilgram.maven(tensor2pil(img))))
            elif style == "mayfair":
                tensors.append(pil2tensor(pilgram.mayfair(tensor2pil(img))))
            elif style == "moon":
                tensors.append(pil2tensor(pilgram.moon(tensor2pil(img))))
            elif style == "nashville":
                tensors.append(pil2tensor(pilgram.nashville(tensor2pil(img))))
            elif style == "perpetua":
                tensors.append(pil2tensor(pilgram.perpetua(tensor2pil(img))))
            elif style == "reyes":
                tensors.append(pil2tensor(pilgram.reyes(tensor2pil(img))))
            elif style == "rise":
                tensors.append(pil2tensor(pilgram.rise(tensor2pil(img))))
            elif style == "slumber":
                tensors.append(pil2tensor(pilgram.slumber(tensor2pil(img))))
            elif style == "stinson":
                tensors.append(pil2tensor(pilgram.stinson(tensor2pil(img))))
            elif style == "toaster":
                tensors.append(pil2tensor(pilgram.toaster(tensor2pil(img))))
            elif style == "valencia":
                tensors.append(pil2tensor(pilgram.valencia(tensor2pil(img))))
            elif style == "walden":
                tensors.append(pil2tensor(pilgram.walden(tensor2pil(img))))
            elif style == "willow":
                tensors.append(pil2tensor(pilgram.willow(tensor2pil(img))))
            elif style == "xpro2":
                tensors.append(pil2tensor(pilgram.xpro2(tensor2pil(img))))
            else:
                tensors.append(img)

        tensors = torch.cat(tensors, dim=0)

        return (tensors, )

```
