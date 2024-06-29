---
tags:
- SAM
---

# GroundingDinoSAMSegment (segment anything)
## Documentation
- Class name: `GroundingDinoSAMSegment (segment anything)`
- Category: `segment_anything`
- Output node: `False`

The GroundingDinoSAMSegment node is designed to leverage the capabilities of the GroundingDINO model for segmenting various objects within an image. It utilizes advanced neural network architectures, including transformers and Swin Transformers, to accurately identify and segment objects by understanding their context and relationships within the image.
## Input types
### Required
- **`sam_model`**
    - Specifies the SAM model to be used in conjunction with the GroundingDINO model for the segmentation task. This model assists in refining the segmentation results obtained from GroundingDINO.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `torch.nn.Module`
- **`grounding_dino_model`**
    - Specifies the GroundingDINO model to be used for initial object detection within the image. This model identifies potential objects of interest based on the provided prompt.
    - Comfy dtype: `GROUNDING_DINO_MODEL`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The input image to be processed. The GroundingDINO model first identifies objects within this image, which are then segmented by the SAM model.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`prompt`**
    - A text prompt that guides the GroundingDINO model in identifying objects of interest within the image. This prompt helps focus the model's attention on relevant objects.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`threshold`**
    - A threshold value that determines the sensitivity of object detection by the GroundingDINO model. Objects with confidence scores above this threshold are considered for segmentation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The segmented images obtained after processing. Each segmented object is returned as a separate image.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The segmentation masks corresponding to each segmented object in the image. These masks indicate the precise area of each object within the original image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - Reroute
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - [Mask Gaussian Region](../../was-node-suite-comfyui/Nodes/Mask Gaussian Region.md)
    - ArithmeticBlend
    - [InvertMask (segment anything)](../../comfyui_segment_anything/Nodes/InvertMask (segment anything).md)
    - [InvertMask](../../Comfy/Nodes/InvertMask.md)
    - [GrowMask](../../Comfy/Nodes/GrowMask.md)



## Source code
```python
class GroundingDinoSAMSegment:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "sam_model": ('SAM_MODEL', {}),
                "grounding_dino_model": ('GROUNDING_DINO_MODEL', {}),
                "image": ('IMAGE', {}),
                "prompt": ("STRING", {}),
                "threshold": ("FLOAT", {
                    "default": 0.3,
                    "min": 0,
                    "max": 1.0,
                    "step": 0.01
                }),
            }
        }
    CATEGORY = "segment_anything"
    FUNCTION = "main"
    RETURN_TYPES = ("IMAGE", "MASK")

    def main(self, grounding_dino_model, sam_model, image, prompt, threshold):
        res_images = []
        res_masks = []
        for item in image:
            item = Image.fromarray(
                np.clip(255. * item.cpu().numpy(), 0, 255).astype(np.uint8)).convert('RGBA')
            boxes = groundingdino_predict(
                grounding_dino_model,
                item,
                prompt,
                threshold
            )
            if boxes.shape[0] == 0:
                break
            (images, masks) = sam_segment(
                sam_model,
                item,
                boxes
            )
            res_images.extend(images)
            res_masks.extend(masks)
        if len(res_images) == 0:
            _, height, width, _ = image.size()
            empty_mask = torch.zeros((1, height, width), dtype=torch.uint8, device="cpu")
            return (empty_mask, empty_mask)
        return (torch.cat(res_images, dim=0), torch.cat(res_masks, dim=0))

```
