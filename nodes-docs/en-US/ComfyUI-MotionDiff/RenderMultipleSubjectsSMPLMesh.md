---
tags:
- SMPL
- SMPLModel
---

# Render Mutiple SMPL Mesh
## Documentation
- Class name: `RenderMultipleSubjectsSMPLMesh`
- Category: `MotionDiff/smpl`
- Output node: `False`

This node is designed to render multiple SMPL mesh subjects within a given scene. It leverages 3D mesh rendering techniques to visualize the motion and form of multiple subjects simultaneously, providing a comprehensive view of their spatial interactions and dynamics.
## Input types
### Required
- **`smpl_multi_subjects`**
    - This input is essential for rendering as it contains the SMPL models of multiple subjects, including their mesh data and possibly motion information. This dataset enables the node to accurately visualize each subject in the scene.
    - Comfy dtype: `SMPL_MULTIPLE_SUBJECTS`
    - Python dtype: `List[Dict[str, Union[np.ndarray, List[np.ndarray]]]]`
- **`draw_platform`**
    - Specifies whether to draw a platform for the subjects to stand on, enhancing the visualization's realism.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`depth_only`**
    - Determines whether to render only the depth map of the scene, which can be useful for certain types of visual analysis.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`fx_offset`**
    - Horizontal offset for the camera's focal point, allowing for adjustments in the rendered scene's perspective.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fy_offset`**
    - Vertical offset for the camera's focal point, enabling fine-tuning of the scene's visual perspective.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`move_x`**
    - Moves the camera along the x-axis, offering control over the scene's composition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`move_y`**
    - Moves the camera along the y-axis, allowing for adjustments in the scene's framing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`move_z`**
    - Moves the camera along the z-axis, providing the ability to alter the scene's depth.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotate_x`**
    - Rotates the camera around the x-axis, enabling changes in the scene's vertical orientation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotate_y`**
    - Rotates the camera around the y-axis, allowing for alterations in the scene's horizontal orientation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotate_z`**
    - Rotates the camera around the z-axis, offering the possibility to adjust the scene's rotational perspective.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`background_hex_color`**
    - Sets the background color of the scene using a hexadecimal color code, enhancing the visual appeal.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`normals`**
    - Determines whether to render the normals of the mesh, which can provide additional detail for visual analysis.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`remove_background`**
    - Specifies whether to remove the background from the rendered scene, focusing the visualization solely on the subjects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output is a visual representation of multiple SMPL models, rendered as meshes within a scene. It provides a detailed view of the subjects' forms and motions.
    - Python dtype: `np.ndarray`
- **`DEPTH_MAP`**
    - Comfy dtype: `IMAGE`
    - The depth map of the rendered scene, offering insights into the spatial relationships and distances between subjects.
    - Python dtype: `np.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RenderMultipleSubjectsSMPLMesh:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl_multi_subjects": ("SMPL_MULTIPLE_SUBJECTS", ),
                "draw_platform": ("BOOLEAN", {"default": False}),
                "depth_only": ("BOOLEAN", {"default": False}),
                "fx_offset": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10000, "step": 0.01}),
                "fy_offset": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10000, "step": 0.01}),
                "move_x": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "move_y": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "move_z": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "rotate_x": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_y": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_z": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "background_hex_color": ("STRING", {"default": "#000000", "mutiline": False}),
            },
            "optional": {
                "normals": ("BOOLEAN", {"default": False}),
                "remove_background": ("BOOLEAN", {"default": True})
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "MASK")
    RETURN_NAMES = ("IMAGE", "DEPTH_MAP")
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "render"
    def render(self, smpl_multi_subjects, fx_offset, fy_offset, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, draw_platform, depth_only, background_hex_color, normals=False, remove_background=True):
        verts_frames, meta = smpl_multi_subjects
        color_frames, depth_frames = render_from_smpl_multiple_subjects(
            verts_frames, meta["faces"], meta["focal_length"],
            fx_offset, fy_offset, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, meta["frame_width"], meta["frame_height"], draw_platform,depth_only, normals,
            cx=meta.get('cx', meta["frame_width"] / 2), cy=meta.get('cy', meta["frame_height"] / 2),
            vertical_flip=meta.get("vertical_flip", True)
        )
        bg_color = ImageColor.getcolor(background_hex_color, "RGB")
        color_frames = torch.from_numpy(color_frames[..., :3].astype(np.float32) / 255.)
        white_mask = [
            (color_frames[..., 0] == 1.) & 
            (color_frames[..., 1] == 1.) & 
            (color_frames[..., 2] == 1.)
        ]
        if remove_background:
            color_frames[..., :3][white_mask] = torch.Tensor(bg_color)
        elif normals:
            color_frames[..., :3][white_mask] = torch.Tensor([128, 128, 255]).float() / 255.
        white_mask_tensor = torch.stack(white_mask, dim=0)
        white_mask_tensor = white_mask_tensor.float() / white_mask_tensor.max()
        white_mask_tensor = 1.0 - white_mask_tensor.permute(1, 2, 3, 0).squeeze(dim=-1)
        #Normalize to [0, 1]
        #For some reason this is already inversed depth???
        normalized_depth = (depth_frames - depth_frames.min()) / (depth_frames.max() - depth_frames.min())
        #https://github.com/Fannovel16/comfyui_controlnet_aux/blob/main/src/controlnet_aux/util.py#L24
        depth_frames = [torch.from_numpy(np.concatenate([x, x, x], axis=2)) for x in normalized_depth[..., None]]
        depth_frames = torch.stack(depth_frames, dim=0)
        return (color_frames, depth_frames, white_mask_tensor,)

```
