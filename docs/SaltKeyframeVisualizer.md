
# Documentation
- Class name: SaltKeyframeVisualizer
- Category: SALT/Scheduling/Util
- Output node: True
- Repo Ref: https://github.com/BennyKok/comfyui-deploy-diffusers-extras

SaltKeyframeVisualizer节点用于可视化随时间变化的关键帧数据，帮助洞察动画或效果的动态变化。它生成关键帧值随帧数变化的可视化表示，有助于评估和调整音视频项目中动画的时间和强度。

# Input types
## Required
- schedule_list
    - 需要可视化的关键帧值列表，代表随时间变化的调度变化。对理解动画或效果的进展至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[float]
## Optional
- start_frame
    - 指定可视化的起始帧，允许集中分析动画的特定片段。
    - Comfy dtype: INT
    - Python dtype: int
- end_frame
    - 定义可视化的结束帧，允许自定义可视化的范围。
    - Comfy dtype: INT
    - Python dtype: int
- simulate_stereo
    - 指示是否通过镜像关键帧值来模拟立体视觉效果，增强可视化的深度。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- frame_rate
    - 动画或效果预期播放的帧率，影响可视化的时间和流畅度。
    - Comfy dtype: INT
    - Python dtype: float
- schedule_list_a
    - 用于额外可视化的可选关键帧值列表，允许比较或叠加多个动画。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- schedule_list_b
    - 另一个用于可视化的可选关键帧值列表，实现更复杂的比较或分层动画。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- schedule_list_c
    - 第三个用于可视化的可选关键帧值列表，进一步扩展复杂动画分析的能力。
    - Comfy dtype: LIST
    - Python dtype: List[float]

# Output types
- ui
    - 生成关键帧数据的可视化表示，包括指标和图表，以便分析和优化动画。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltKeyframeVisualizer:
    @classmethod
    def INPUT_TYPES(cls):
        input_types = {
            "required": {
                "schedule_list": ("LIST",),
            },
            "optional": {
                "start_frame": ("INT", {"min": 0, "default": 0}),
                "end_frame": ("INT", {"min": 0, "default": -1}),
                "simulate_stereo": ("BOOLEAN", {"default": False}),
                "frame_rate": ("INT", {"min": 1, "default": 24}),
                "schedule_list_a": ("LIST", {"default": None}),
                "schedule_list_b": ("LIST", {"default": None}),
                "schedule_list_c": ("LIST", {"default": None}),
            }
        }
        return input_types

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = "visualize_keyframes"
    CATEGORY = "SALT/Scheduling/Util"

    def visualize_keyframes(self, schedule_list, start_frame=0, end_frame=-1, simulate_stereo=False, frame_rate=24.0, schedule_list_a=None, schedule_list_b=None, schedule_list_c=None):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        schedule_lists = [schedule_list, schedule_list_a, schedule_list_b, schedule_list_c]
        colors = ['tab:blue', 'tab:orange', 'tab:green', 'tab:red']
        schedule_names = ['Schedule List', 'Schedule List A', 'Schedule List B', 'Schedule List C']
        metrics_data = []

        plt.figure(figsize=(10, 14 if simulate_stereo else 8))

        for i, sched_list in enumerate(schedule_lists):
            if sched_list is not None:
                if end_frame == -1 or end_frame > len(sched_list):
                    end_frame = len(sched_list)

                num_frames = max(2, end_frame - start_frame)
                frames = np.linspace(start_frame, end_frame - 1, num=num_frames, endpoint=True)
                keyframe_values = np.array(sched_list[start_frame:end_frame])

                plt.plot(frames, keyframe_values, color=colors[i], linewidth=0.5, label=schedule_names[i] + ' Left')
                if simulate_stereo:
                    plt.plot(frames, -keyframe_values, color=colors[i], linewidth=0.5, linestyle='dashed', label=schedule_names[i] + ' Right')
                    plt.fill_between(frames, keyframe_values, 0, color=colors[i], alpha=0.3)
                    plt.fill_between(frames, -keyframe_values, 0, color=colors[i], alpha=0.3)

                metrics = {
                    "Max": np.round(np.max(keyframe_values), 2),
                    "Min": np.round(np.min(keyframe_values), 2),
                    "Sum": np.round(np.sum(keyframe_values), 2),
                    "Avg": np.round(np.mean(keyframe_values), 2),
                    "Abs Sum": np.round(np.sum(np.abs(keyframe_values)), 2),
                    "Abs Avg": np.round(np.mean(np.abs(keyframe_values)), 2),
                    "Duration": (num_frames / frame_rate)
                }
                metrics_data.append((schedule_names[i], metrics))

        plt.title('Schedule Visualization')
        plt.xlabel('Frame')
        plt.ylabel('Value')
        plt.legend(loc='upper right')

        metrics_text = "Metric Values:\n"
        for name, data in metrics_data:
            metrics_text += f"{name}: "
            metrics_text += ' | '.join([f"{k}: {v}" for k, v in data.items()])
            metrics_text += "\n"

        plt.figtext(0.5, -0.2 if simulate_stereo else -0.1, metrics_text, ha="center", fontsize=12,
                    bbox={"facecolor": "lightblue", "alpha": 0.5, "pad": 5}, wrap=True)

        filename = str(uuid.uuid4()) + "_keyframe_visualization.png"
        file_path = os.path.join(TEMP, filename)

        plt.savefig(file_path, bbox_inches="tight", pad_inches=1 if simulate_stereo else 0.1)
        plt.close()

        return {
            "ui": {
                "images": [
                    {
                        "filename": filename,
                        "subfolder": "",
                        "type": "temp"
                    }
                ]
            }
        }
    
    @staticmethod
    def gen_hash(input_dict):
        sorted_json = json.dumps(input_dict, sort_keys=True)
        hash_obj = hashlib.sha256()
        hash_obj.update(sorted_json.encode('utf-8'))
        return hash_obj.hexdigest()
    
    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return cls.gen_hash(kwargs)

```
