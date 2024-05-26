# Documentation
- Class name: LoadMotionTrajPreset
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl.git

LoadMotionTrajPreset节点旨在为运动控制应用加载和处理预定义的运动轨迹。它接受特定的运动轨迹预设和帧长度，然后从文本文件中读取并缩放点以匹配所需的帧长度，确保与运动控制系统的无缝集成。

# Input types
## Required
- motion_traj
    - motion_traj参数指定要加载的运动轨迹预设的名称。它对于确定节点将处理的特定运动模式至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- frame_length
    - frame_length参数允许用户定义运动轨迹的帧数。这对于调整运动以适应动画或模拟所需的持续时间非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- POINTS
    - POINTS输出包含代表运动轨迹的处理后的点列表，准备用于下游运动控制过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LoadMotionTrajPreset:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'motion_traj': (MOTION_TRAJ_OPTIONS,), 'frame_length': ('INT', {'default': 16})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('POINTS',)
    FUNCTION = 'load_motion_traj_preset'
    CATEGORY = 'motionctrl'

    def load_motion_traj_preset(self, motion_traj, frame_length):
        comfy_path = os.path.dirname(folder_paths.__file__)
        points = read_points(f'{comfy_path}/custom_nodes/ComfyUI-MotionCtrl/examples/trajectories/{motion_traj}.txt', frame_length)
        return (json.dumps(points),)
```