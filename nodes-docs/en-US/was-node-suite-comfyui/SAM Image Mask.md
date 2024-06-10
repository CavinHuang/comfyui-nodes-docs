---
tags:
- SAM
---

# SAM Image Mask
## Documentation
- Class name: `SAM Image Mask`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node applies the SAM (Segment Anything Model) to an input image, generating a mask based on specified points and labels. It leverages a SAM model and parameters to perform segmentation, producing both a modified image and a corresponding mask.
## Input types
### Required
- **`sam_model`**
    - The SAM model to be used for image segmentation. It plays a crucial role in determining the accuracy and quality of the segmentation output.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `torch.nn.Module`
- **`sam_parameters`**
    - A dictionary containing parameters such as points and labels for the SAM model to use during segmentation. These parameters guide the model in identifying and segmenting the relevant parts of the image.
    - Comfy dtype: `SAM_PARAMETERS`
    - Python dtype: `Dict[str, Any]`
- **`image`**
    - The input image to be segmented. This image is processed and modified by the SAM model based on the provided parameters.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified image after applying the SAM model and segmentation process.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The generated mask corresponding to the segmented parts of the input image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_SAM_Image_Mask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "sam_model": ("SAM_MODEL",),
                "sam_parameters": ("SAM_PARAMETERS",),
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    FUNCTION = "sam_image_mask"

    CATEGORY = "WAS Suite/Image/Masking"

    def sam_image_mask(self, sam_model, sam_parameters, image):
        image = tensor2sam(image)
        points = sam_parameters["points"]
        labels = sam_parameters["labels"]

        from segment_anything import SamPredictor

        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        sam_model.to(device=device)

        predictor = SamPredictor(sam_model)
        predictor.set_image(image)

        masks, scores, logits = predictor.predict(
            point_coords=points,
            point_labels=labels,
            multimask_output=False
        )

        sam_model.to(device='cpu')

        mask = np.expand_dims(masks, axis=-1)

        image = np.repeat(mask, 3, axis=-1)
        image = torch.from_numpy(image)

        mask = torch.from_numpy(mask)
        mask = mask.squeeze(2)
        mask = mask.squeeze().to(torch.float32)

        return (image, mask, )

```
