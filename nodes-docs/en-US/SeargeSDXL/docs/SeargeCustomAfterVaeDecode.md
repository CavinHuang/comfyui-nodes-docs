---
tags:
- VAE
---

# After VAE Decode
## Documentation
- Class name: `SeargeCustomAfterVaeDecode`
- Category: `Searge/Magic/Custom Stages`
- Output node: `False`

This node is designed to process the output of a VAE decoding stage, specifically handling custom outputs. It retrieves and optionally post-processes the decoded image, providing a flexible mechanism to integrate custom processing or adjustments post VAE decoding.
## Input types
### Required
- **`custom_output`**
    - The custom output from a previous stage, expected to contain VAE decoded data along with any additional custom parameters or results that need further processing.
    - Comfy dtype: `SRG_STAGE_OUTPUT`
    - Python dtype: `Dict[str, Any]`
### Optional
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final processed image, which may be the original decoded image or a post-processed version, depending on the presence of post-processing steps.
    - Python dtype: `Union[torch.Tensor, None]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeCustomAfterVaeDecode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "custom_output": ("SRG_STAGE_OUTPUT",),
            },
            "optional": {
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "output"

    CATEGORY = UI.CATEGORY_MAGIC_CUSTOM_STAGES

    def output(self, custom_output):
        if custom_output is None:
            return (None,)

        vae_decoded = retrieve_parameter(Names.S_VAE_DECODED, custom_output)
        image = retrieve_parameter(Names.F_DECODED_IMAGE, vae_decoded)
        post_processed = retrieve_parameter(Names.F_POST_PROCESSED, vae_decoded)

        result = image if post_processed is None else post_processed
        return (result,)

```
