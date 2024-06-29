---
tags:
- Face
- FaceRestoration
---

# Restore Face (mtb)
## Documentation
- Class name: `Restore Face (mtb)`
- Category: `mtb/facetools`
- Output node: `False`

The Restore Face node leverages GFPGan to enhance and restore faces in images, focusing on improving visual quality and details. It supports adjustments such as alignment, center face restoration, and weight modulation for tailored image enhancement.
## Input types
### Required
- **`image`**
    - The input image tensor to be enhanced. It is crucial for the restoration process, determining the quality and focus of the enhancement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`model`**
    - The face enhancement model used for restoration. It defines the algorithm and parameters for the enhancement process.
    - Comfy dtype: `FACEENHANCE_MODEL`
    - Python dtype: `GFPGANer`
- **`aligned`**
    - A boolean indicating if the input faces are aligned. This affects how the model processes the image, potentially improving restoration quality for aligned faces.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`only_center_face`**
    - A boolean that, when true, restricts the restoration to only the center face in the image, focusing the enhancement efforts.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`weight`**
    - A float value representing the weight of the restoration effect. It allows for fine-tuning the intensity of the enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`save_tmp_steps`**
    - A boolean indicating whether to save intermediate steps of the restoration process. This can be useful for debugging or analysis.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The enhanced image tensor, showcasing improved facial details and overall image quality after restoration.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_RestoreFace:
    """Uses GFPGan to restore faces"""

    def __init__(self) -> None:
        pass

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "restore"
    CATEGORY = "mtb/facetools"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "model": ("FACEENHANCE_MODEL",),
                # Input are aligned faces
                "aligned": ("BOOLEAN", {"default": False}),
                # Only restore the center face
                "only_center_face": ("BOOLEAN", {"default": False}),
                # Adjustable weights
                "weight": ("FLOAT", {"default": 0.5}),
                "save_tmp_steps": ("BOOLEAN", {"default": True}),
            }
        }

    def do_restore(
        self,
        image: torch.Tensor,
        model,
        aligned,
        only_center_face,
        weight,
        save_tmp_steps,
    ) -> torch.Tensor:
        pimage = tensor2np(image)[0]
        width, height = pimage.shape[1], pimage.shape[0]
        source_img = cv2.cvtColor(np.array(pimage), cv2.COLOR_RGB2BGR)

        sys.stdout = NullWriter()
        cropped_faces, restored_faces, restored_img = model.enhance(
            source_img,
            has_aligned=aligned,
            only_center_face=only_center_face,
            paste_back=True,
            # TODO: weight has no effect in 1.3 and 1.4 (only tested these for now...)
            weight=weight,
        )
        sys.stdout = sys.__stdout__
        log.warning(f"Weight value has no effect for now. (value: {weight})")

        if save_tmp_steps:
            self.save_intermediate_images(
                cropped_faces, restored_faces, height, width
            )
        output = None
        if restored_img is not None:
            output = Image.fromarray(
                cv2.cvtColor(restored_img, cv2.COLOR_BGR2RGB)
            )
            # imwrite(restored_img, save_restore_path)

        return pil2tensor(output)

    def restore(
        self,
        image: torch.Tensor,
        model,
        aligned=False,
        only_center_face=False,
        weight=0.5,
        save_tmp_steps=True,
    ) -> tuple[torch.Tensor]:
        out = [
            self.do_restore(
                image[i],
                model,
                aligned,
                only_center_face,
                weight,
                save_tmp_steps,
            )
            for i in range(image.size(0))
        ]

        return (torch.cat(out, dim=0),)

    def get_step_image_path(self, step, idx):
        (
            full_output_folder,
            filename,
            counter,
            _subfolder,
            _filename_prefix,
        ) = folder_paths.get_save_image_path(
            f"{step}_{idx:03}",
            folder_paths.temp_directory,
        )
        file = f"{filename}_{counter:05}_.png"

        return os.path.join(full_output_folder, file)

    def save_intermediate_images(
        self, cropped_faces, restored_faces, height, width
    ):
        for idx, (cropped_face, restored_face) in enumerate(
            zip(cropped_faces, restored_faces)
        ):
            face_id = idx + 1
            file = self.get_step_image_path("cropped_faces", face_id)
            cv2.imwrite(file, cropped_face)

            file = self.get_step_image_path("cropped_faces_restored", face_id)
            cv2.imwrite(file, restored_face)

            file = self.get_step_image_path("cropped_faces_compare", face_id)

            # save comparison image
            cmp_img = np.concatenate((cropped_face, restored_face), axis=1)
            cv2.imwrite(file, cmp_img)

```
