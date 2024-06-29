---
tags:
- Color
---

# Cinematic Look (Mikey)
## Documentation
- Class name: `CinematicLook`
- Category: `Mikey/Image`
- Output node: `False`

The CinematicLook node is designed to transform images by applying a cinematic look, combining techniques from ImageOverlay and HALDClut. It enhances visuals to evoke a film-like aesthetic, incorporating various styles such as modern, retro, and black and white, among others.
## Input types
### Required
- **`image`**
    - The image parameter represents the visual content to be transformed. It serves as the base for applying the cinematic look, determining the final aesthetic outcome.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`look`**
    - The look parameter specifies the desired cinematic style to be applied to the image, such as 'modern', 'retro', or 'black and white'. It influences the visual characteristics and mood of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`result_img`**
    - Comfy dtype: `IMAGE`
    - The output is a transformed image with the applied cinematic look, reflecting the specified style and enhancing the visual appeal.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CinematicLook:
    # combine function from ImageOverlay and HALDClut to create a cinematic look
    @classmethod
    def INPUT_TYPES(s):
        s.haldclut_files = read_cluts()
        s.file_names = [os.path.basename(f) for f in s.haldclut_files]
        return {'required': {'image': ('IMAGE', {'default': None}),
                             'look': (['modern','retro','clipped','broadcast','black and white','black and white - warm'],)}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('result_img',)
    FUNCTION = 'cinematic_look'
    CATEGORY = 'Mikey/Image'

    def apply_haldclut(self, image, hald_clut, gamma_correction):
        hald_img = Image.open(self.haldclut_files[self.file_names.index(hald_clut)])
        img = tensor2pil(image)
        if gamma_correction == 'True':
            corrected_img = gamma_correction_pil(img, 1.0/2.2)
        else:
            corrected_img = img
        filtered_image = apply_hald_clut(hald_img, corrected_img).convert("RGB")
        return filtered_image

    @apply_to_batch
    def cinematic_look(self, image, look):
        # load haldclut
        if look == 'modern':
            image = self.apply_haldclut(image, 'modern.png', 'False')
        elif look == 'retro':
            image = self.apply_haldclut(image, 'retro.png', 'False')
        elif look == 'clipped':
            image = self.apply_haldclut(image, 'clipped.png', 'False')
        elif look == 'broadcast':
            image = self.apply_haldclut(image, 'broadcast.png', 'False')
        elif look == 'black and white':
            image = self.apply_haldclut(image, 'bw.png', 'False')
        elif look == 'black and white - warm':
            image = self.apply_haldclut(image, 'bw_warm.png', 'False')
        p = os.path.dirname(os.path.realpath(__file__))
        if look in ['black and white',]:
            noise_img = os.path.join(p, 'noise_bw.png')
        else:
            noise_img = os.path.join(p, 'noise.png')
        # load noise image
        noise = Image.open(noise_img)
        IO = ImageOverlay()
        image = pil2tensor(image)
        noise = pil2tensor(noise)
        if look == 'modern':
            image = IO.overlay(image, noise, 0.3)[0]
        if look == 'retro':
            image = IO.overlay(image, noise, 0.4)[0]
        if look == 'clipped':
            image = IO.overlay(image, noise, 0.25)[0]
        if look == 'broadcast':
            image = IO.overlay(image, noise, 0.3)[0]
        if look == 'black and white':
            image = IO.overlay(image, noise, 0.25)[0]
        if look == 'black and white - warm':
            image = IO.overlay(image, noise, 0.25)[0]
        return image

    #def apply_cinematic_look(self, image, look):
    #    # image can be 1 or more images if batch size > 1
    #    images = []
    #    for img in image:
    #        images.append(self.cinematic_look(img, look))
    #    batch_tensor = torch.cat(images, dim=0)
    #    return (batch_tensor, )

```
