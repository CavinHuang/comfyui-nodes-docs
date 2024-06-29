---
tags:
- DepthMap
- Image
- ImagePreprocessing
---

# Reference Preproccessor 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_ReferencePreprocessor`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/Reference/preprocess`
- Output node: `False`

The ACN_ReferencePreprocessor node is designed to preprocess reference inputs for the Advanced ControlNet, transforming them into a format suitable for further manipulation and application within the network. It emphasizes the importance of preparing reference data in a way that aligns with the network's requirements for optimal performance.
## Input types
### Required
- **`image`**
    - The image parameter is the visual data to be processed, serving as a foundational input for the preprocessing operation. It is essential for aligning the input image with the network's requirements.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tensor`
- **`vae`**
    - The vae parameter represents the variational autoencoder used in the preprocessing step. It is crucial for encoding the image into a latent space representation, facilitating its compatibility with the network.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`latent_size`**
    - The latent_size parameter specifies the dimensions of the latent space into which the image is encoded. It plays a key role in ensuring that the processed image matches the expected input size for the network.
    - Comfy dtype: `LATENT`
    - Python dtype: `Tensor`
## Output types
- **`proc_IMAGE`**
    - Comfy dtype: `IMAGE`
    - This output is a specialized latent representation, not a typical image, intended for direct use with an Apply Advanced ControlNet node. It underscores the unique handling of reference data within the system.
    - Python dtype: `AbstractPreprocWrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ReferencePreprocessorNode:
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

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/Reference/preprocess"

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
        return (ReferencePreprocWrapper(condhint=encoded),)

```
