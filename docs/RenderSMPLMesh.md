
# Documentation
- Class name: RenderSMPLMesh
- Category: MotionDiff/smpl
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RenderSMPLMesh节点专门用于根据SMPL模型渲染3D人体网格。它的主要功能是从SMPL参数生成视觉表示，使得能够在3D环境中可视化人体姿势和形状。

# Input types
## Required
- smpl
    - SMPL模型参数，用于渲染3D网格。这个输入对于确定要可视化的人体姿势和形状至关重要。
    - Comfy dtype: SMPL
    - Python dtype: torch.Tensor
- draw_platform
    - 指定是否在渲染图像中绘制平台，影响3D网格的视觉环境。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- depth_only
    - 决定是否只渲染深度图，省略3D网格的视觉表示。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- yfov
    - 相机在y轴上的视场角，影响网格渲染的视角。
    - Comfy dtype: FLOAT
    - Python dtype: float
- move_x
    - 相机的水平移动，允许调整渲染视角的横向位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- move_y
    - 相机的垂直移动，允许调整渲染视角的纵向位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- move_z
    - 相机的深度移动，影响相机与3D网格之间的距离。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotate_x
    - 相机绕x轴旋转，改变渲染图像的俯仰角。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotate_y
    - 相机绕y轴旋转，改变渲染视角的偏航角。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotate_z
    - 相机绕z轴旋转，修改渲染视角的滚动角。
    - Comfy dtype: FLOAT
    - Python dtype: float
- background_hex_color
    - 渲染图像的背景颜色，以十六进制颜色代码指定。
    - Comfy dtype: STRING
    - Python dtype: str
- frame_width
    - 渲染图像的框架宽度，定义水平分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- frame_height
    - 渲染图像的框架高度，定义垂直分辨率。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- normals
    - 指示渲染中是否应包含法线，影响3D网格的视觉纹理和光照效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - 输出是根据SMPL参数渲染的3D网格的视觉表示（图像）。这个图像展示了各种姿势和形状的人体形象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- DEPTH_MAP
    - 渲染的3D网格的深度图，提供图像中每个像素的空间深度信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RenderSMPLMesh:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl": ("SMPL", ),
                "draw_platform": ("BOOLEAN", {"default": False}),
                "depth_only": ("BOOLEAN", {"default": False}),
                "yfov": ("FLOAT", {"default": 0.6, "min": 0.1, "max": 10, "step": 0.01}),
                "move_x": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "move_y": ("FLOAT", {"default": -0.1,"min": -500, "max": 500, "step": 0.01}),
                "move_z": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "rotate_x": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_y": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_z": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "background_hex_color": ("STRING", {"default": "#000000", "mutiline": False}),
                "frame_width": ("INT", {"default": 512, "min": 64, "max": 4096, "step": 8}),
                "frame_height": ("INT", {"default": 512, "min": 64, "max": 4096, "step": 8}),
            },
            "optional": {
                "normals": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "MASK")
    RETURN_NAMES = ("IMAGE", "DEPTH_MAP")
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "render"
    def render(self, smpl, yfov, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, frame_width, frame_height, draw_platform, depth_only, background_hex_color, normals=False):
        smpl_model_path, thetas, meta = smpl
        color_frames, depth_frames = render_from_smpl(
            thetas.to(get_torch_device()),
            yfov, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, frame_width, frame_height, draw_platform,depth_only, normals,
            smpl_model_path=smpl_model_path, shape_parameters=smpl[2].get("shape_parameters", None),
            normalized_to_vertices=meta.get("normalized_to_vertices", False)
        )
        bg_color = ImageColor.getcolor(background_hex_color, "RGB")
        color_frames = torch.from_numpy(color_frames[..., :3].astype(np.float32) / 255.)
        white_mask = [
            (color_frames[..., 0] == 1.) & 
            (color_frames[..., 1] == 1.) & 
            (color_frames[..., 2] == 1.)
        ]
        color_frames[..., :3][white_mask] = torch.Tensor(bg_color)
        white_mask_tensor = torch.stack(white_mask, dim=0)
        white_mask_tensor = white_mask_tensor.float() / white_mask_tensor.max()
        white_mask_tensor = 1.0 - white_mask_tensor.permute(1, 2, 3, 0).squeeze(dim=-1)
        #Normalize to [0, 1]
        normalized_depth = (depth_frames - depth_frames.min()) / (depth_frames.max() - depth_frames.min())
        #Pyrender's depths are the distance in meters to the camera, which is the inverse of depths in normal context
        #Ref: https://github.com/mmatl/pyrender/issues/10#issuecomment-468995891
        normalized_depth[normalized_depth != 0] = 1 - normalized_depth[normalized_depth != 0]
        #https://github.com/Fannovel16/comfyui_controlnet_aux/blob/main/src/controlnet_aux/util.py#L24
        depth_frames = [torch.from_numpy(np.concatenate([x, x, x], axis=2)) for x in normalized_depth[..., None]]
        depth_frames = torch.stack(depth_frames, dim=0)
        return (color_frames, depth_frames, white_mask_tensor,)

```
