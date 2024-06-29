---
tags:
- DepthMap
- Image
- ImagePreprocessing
---

# RGB SparseCtrl 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_SparseCtrlRGBPreprocessor`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/preprocess`
- Output node: `False`

The ACN_SparseCtrlRGBPreprocessor node is designed for preprocessing images for use with RGB Sparse ControlNet models. It adjusts the input image to match the latent size required by the model, encodes the image into a latent representation, and wraps this representation in a format that is specifically tailored for subsequent processing by Advanced ControlNet nodes. This preprocessing step is crucial for ensuring that the input images are compatible with the unique requirements of RGB Sparse ControlNet models.
## Input types
### Required
- **`image`**
    - The input image to be preprocessed. This image is resized and encoded into a latent representation suitable for RGB Sparse ControlNet models.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tensor`
- **`vae`**
    - The variational autoencoder (VAE) used for encoding the input image into a latent representation.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`latent_size`**
    - The target size for the latent representation, ensuring compatibility with the RGB Sparse ControlNet model's requirements.
    - Comfy dtype: `LATENT`
    - Python dtype: `Tensor`
## Output types
- **`proc_IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed image, now in a latent format wrapped in a PreprocSparseRGBWrapper, ready for use with Advanced ControlNet nodes.
    - Python dtype: `PreprocSparseRGBWrapper`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RgbSparseCtrlPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE", ),
                "vae": ("VAE", ),
                "latent_size": ("LATENT", ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("proc_IMAGE",)
    FUNCTION = "preprocess_images"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/preprocess"

    def preprocess_images(self, vae: VAE, image: Tensor, latent_size: Tensor):
        # first, resize image to match latents
        image = image.movedim(-1,1)
        image = comfy.utils.common_upscale(image, latent_size["samples"].shape[3] * 8, latent_size["samples"].shape[2] * 8, 'nearest-exact', "center")
        image = image.movedim(1,-1)
        # then, vae encode
        try:
            image = vae.vae_encode_crop_pixels(image)
        except Exception:
            image = VAEEncode.vae_encode_crop_pixels(image)
        encoded = vae.encode(image[:,:,:,:3])
        return (PreprocSparseRGBWrapper(condhint=encoded),)

```
