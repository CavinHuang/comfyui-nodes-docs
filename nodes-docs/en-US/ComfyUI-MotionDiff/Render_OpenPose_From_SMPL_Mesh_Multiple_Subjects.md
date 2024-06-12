---
tags:
- SMPL
- SMPLModel
---

# Render OpenPose from SMPL Multiple
## Documentation
- Class name: `Render_OpenPose_From_SMPL_Mesh_Multiple_Subjects`
- Category: `MotionDiff/smpl`
- Output node: `False`

This node is designed to render OpenPose keypoints from multiple SMPL mesh subjects, facilitating the visualization of human poses and movements in a standardized format. It emphasizes the conversion of 3D mesh data into 2D pose representations, enabling a more intuitive understanding of complex human interactions captured by the SMPL model.
## Input types
### Required
- **`smpl_multi_subjects`**
    - Represents multiple SMPL model subjects, serving as the input for generating OpenPose visualizations. This parameter is crucial for processing and rendering the poses of multiple individuals simultaneously.
    - Comfy dtype: `SMPL_MULTIPLE_SUBJECTS`
    - Python dtype: `List[Dict[str, Any]]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image representation of OpenPose keypoints, providing a visual summary of human poses derived from the input SMPL meshes.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Render_OpenPose_From_SMPL_Mesh_Multiple_Subjects:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl_multi_subjects": ("SMPL_MULTIPLE_SUBJECTS", )
            },
        }
    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "render"
    def render(self, smpl_multi_subjects):
        render_openpose = smpl_multi_subjects[1].get("render_openpose", None)
        if render_openpose is None:
            raise NotImplementedError("render_openpose")
        return (render_openpose().float() / 255., )

```
