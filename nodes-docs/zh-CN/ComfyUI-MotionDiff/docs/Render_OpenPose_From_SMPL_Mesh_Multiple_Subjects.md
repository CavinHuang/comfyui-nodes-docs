
# Documentation
- Class name: Render_OpenPose_From_SMPL_Mesh_Multiple_Subjects
- Category: MotionDiff/smpl
- Output node: False

该节点旨在从多个SMPL网格主体渲染OpenPose关键点,便于以标准化格式可视化人体姿势和动作。它强调将3D网格数据转换为2D姿势表示,使得对SMPL模型捕获的复杂人体互动有更直观的理解。

# Input types
## Required
- smpl_multi_subjects
    - 代表多个SMPL模型主体,作为生成OpenPose可视化的输入。该参数对于同时处理和渲染多个个体的姿势至关重要。
    - Comfy dtype: SMPL_MULTIPLE_SUBJECTS
    - Python dtype: List[Dict[str, Any]]

# Output types
- image
    - 输出是OpenPose关键点的图像表示,提供了从输入SMPL网格中提取的人体姿势的视觉摘要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
