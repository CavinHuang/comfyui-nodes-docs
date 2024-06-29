---
tags:
- Color
---

# HaldCLUT 
## Documentation
- Class name: `HaldCLUT `
- Category: `Mikey/Image`
- Output node: `True`

The HaldCLUT node applies a color lookup table (CLUT) to an image, optionally performing gamma correction, to achieve various color grading effects. This process allows for the transformation of the image's color palette based on predefined CLUT files, enhancing or altering its aesthetic according to the selected CLUT.
## Input types
### Required
- **`image`**
    - The input image to which the color lookup table will be applied. This image undergoes color transformation based on the selected HaldCLUT file and gamma correction settings.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`hald_clut`**
    - The name of the HaldCLUT file to be used for color transformation. This selection determines the specific color grading effect to be applied to the input image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`gamma_correction`**
    - A boolean flag indicating whether gamma correction should be applied to the input image before color transformation. This can affect the image's brightness and contrast.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`i`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the selected color lookup table and optional gamma correction. This image reflects the color grading effect determined by the HaldCLUT file.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class HaldCLUT:
    @classmethod
    def INPUT_TYPES(s):
        s.haldclut_files = read_cluts()
        s.file_names = [os.path.basename(f) for f in s.haldclut_files]
        return {"required": {"image": ("IMAGE",),
                             "hald_clut": (s.file_names,),
                             "gamma_correction": (['True','False'],)}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image,')
    FUNCTION = 'apply_haldclut'
    CATEGORY = 'Mikey/Image'
    OUTPUT_NODE = True

    @apply_to_batch
    def apply_haldclut(self, image, hald_clut, gamma_correction):
        hald_img = Image.open(self.haldclut_files[self.file_names.index(hald_clut)])
        img = tensor2pil(image)
        if gamma_correction == 'True':
            corrected_img = gamma_correction_pil(img, 1.0/2.2)
        else:
            corrected_img = img
        filtered_image = apply_hald_clut(hald_img, corrected_img).convert("RGB")
        #return (pil2tensor(filtered_image), )
        return pil2tensor(filtered_image)

    @classmethod
    def IS_CHANGED(self, hald_clut):
        return (np.nan,)

```
