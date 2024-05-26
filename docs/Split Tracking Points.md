# Documentation
- Class name: SplitTrackingPoints
- Category: DragNUWA
- Output node: True
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

SplitTrackingPoints节点旨在处理和操作来自姿态关键点数据的跟踪点。它便于将跟踪点分割成不同实体，使得分析和跟踪操作更加精细。该节点特别适用于需要在定义区域内详细跟踪人体运动的应用，有助于更细致地理解运动模式。

# Input types
## Required
- pose_kps
    - 姿态关键点数据对于节点至关重要，因为它是跟踪和分析的主要输入。该参数直接影响节点处理和分割跟踪点的能力，影响跟踪操作的准确性和可靠性。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict[str, Union[int, float, List[Union[str, int, float]]]]]
- split_index
    - split_index参数控制跟踪点的分割，允许在跟踪数据中分离不同的实体。这对于节点正确运行和实现跟踪点的期望分割至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数定义了跟踪区域的垂直维度，这对于在指定边界内过滤和处理跟踪点非常重要。它确保跟踪操作限制在相关区域，提高了节点的有效性。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - width参数设置了跟踪区域的水平维度，在跟踪点的过滤和处理中起着关键作用。它对于确保跟踪点与指定区域的相关性至关重要，有助于提高节点的准确性和效率。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- last_pose_kps
    - last_pose_kps参数提供了时，作为初始跟踪点的参考，有助于跟踪过程的连续性和一致性。它增强了节点随时间保持准确跟踪的能力。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict[str, Union[int, float, List[Union[str, int, float]]]]]

# Output types
- tracking_points
    - tracking_points输出提供了分割后的跟踪点的JSON格式表示，将处理后的数据封装在结构化且易于访问的格式中。这个输出对于进一步的分析和集成到下游应用至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SplitTrackingPoints:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pose_kps': ('POSE_KEYPOINT',), 'split_index': ('INT', {'default': 0}), 'height': ('INT', {'default': 320}), 'width': ('INT', {'default': 576})}, 'optional': {'last_pose_kps': ('POSE_KEYPOINT', {'default': None})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('tracking_points',)
    FUNCTION = 'split_tracking_points'
    OUTPUT_NODE = True
    CATEGORY = 'DragNUWA'

    def split_tracking_points(self, pose_kps, split_index, height, width, last_pose_kps=None):
        if split_index != 0:
            if last_pose_kps is not None:
                pose_kps[split_index * 14] = last_pose_kps[0]
        trajs = []
        for ipose in range(int(len(pose_kps[split_index * 14]['people'][0]['pose_keypoints_2d']) / 3)):
            traj = []
            for itracking in range(14):
                people = pose_kps[split_index * 14 + itracking]['people']
                if people[0]['pose_keypoints_2d'][ipose * 3 + 2] == 1.0:
                    x = people[0]['pose_keypoints_2d'][ipose * 3]
                    y = people[0]['pose_keypoints_2d'][ipose * 3 + 1]
                    if x <= width and y <= height:
                        traj.append([x, y])
                    else:
                        break
                elif len(traj) > 0:
                    traj.append(traj[len(traj) - 1])
                else:
                    break
        if len(traj) > 0:
            trajs.append(traj)
        return (json.dumps(trajs),)
```