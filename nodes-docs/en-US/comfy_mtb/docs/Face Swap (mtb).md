---
tags:
- Face
---

# Face Swap (mtb)
## Documentation
- Class name: `Face Swap (mtb)`
- Category: `mtb/facetools`
- Output node: `False`

The Face Swap node enables the swapping of faces between two images using deep learning models. It leverages face analysis to identify faces in the source and target images and applies a face swap model to replace the target image's face with that of the source image, supporting single or multiple faces swapping.
## Input types
### Required
- **`image`**
    - The image tensor where the face(s) will be swapped into. It serves as the target image for the face swap operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`reference`**
    - The reference image tensor providing the face(s) to be swapped into the target image. It acts as the source of the face(s) for the swapping process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`faces_index`**
    - A string specifying the indices of the faces in the target image to be swapped. It allows selective swapping of faces when multiple are present.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`faceanalysis_model`**
    - The model used for analyzing faces within the images. It's crucial for detecting and preparing faces for the swapping process.
    - Comfy dtype: `FACE_ANALYSIS_MODEL`
    - Python dtype: `insightface.app.FaceAnalysis`
- **`faceswap_model`**
    - The model responsible for the actual face swapping. It performs the core operation of replacing the target face with the source face.
    - Comfy dtype: `FACESWAP_MODEL`
    - Python dtype: `insightface.model_zoo.inswapper.INSwapper`
### Optional
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image tensor after the face swap has been performed, with the target face(s) replaced by the source face(s).
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_FaceSwap:
    """Face swap using deepinsight/insightface models"""

    model = None
    model_path = None

    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "reference": ("IMAGE",),
                "faces_index": ("STRING", {"default": "0"}),
                "faceanalysis_model": (
                    "FACE_ANALYSIS_MODEL",
                    {"default": "None"},
                ),
                "faceswap_model": ("FACESWAP_MODEL", {"default": "None"}),
            },
            "optional": {},
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "swap"
    CATEGORY = "mtb/facetools"

    def swap(
        self,
        image: torch.Tensor,
        reference: torch.Tensor,
        faces_index: str,
        faceanalysis_model,
        faceswap_model,
    ):
        def do_swap(img):
            model_management.throw_exception_if_processing_interrupted()
            img = tensor2pil(img)[0]
            ref = tensor2pil(reference)[0]
            face_ids = {
                int(x)
                for x in faces_index.strip(",").split(",")
                if x.isnumeric()
            }
            sys.stdout = NullWriter()
            swapped = swap_face(
                faceanalysis_model, ref, img, faceswap_model, face_ids
            )
            sys.stdout = sys.__stdout__
            return pil2tensor(swapped)

        batch_count = image.size(0)

        log.info(f"Running insightface swap (batch size: {batch_count})")

        if reference.size(0) != 1:
            raise ValueError("Reference image must have batch size 1")
        if batch_count == 1:
            image = do_swap(image)

        else:
            image_batch = [do_swap(image[i]) for i in range(batch_count)]
            image = torch.cat(image_batch, dim=0)

        return (image,)

```
