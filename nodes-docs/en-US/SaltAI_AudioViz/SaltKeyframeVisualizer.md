---
tags:
- AnimationScheduling
- Scheduling
---

# Schedule Visualizer
## Documentation
- Class name: `SaltKeyframeVisualizer`
- Category: `SALT/Scheduling/Util`
- Output node: `True`

The SaltKeyframeVisualizer node is designed for visualizing keyframe data over time, providing insights into the dynamics of scheduled animations or effects. It generates visual representations of keyframe values across frames, aiding in the evaluation and adjustment of timing and intensity for animations within audiovisual projects.
## Input types
### Required
- **`schedule_list`**
    - The list of keyframe values to be visualized, representing the scheduled changes over time. It is crucial for understanding the animation or effect's progression.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
### Optional
- **`start_frame`**
    - Specifies the starting frame for the visualization, allowing for focused analysis on a specific segment of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_frame`**
    - Defines the ending frame for the visualization, enabling customization of the visualization's scope.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`simulate_stereo`**
    - Indicates whether to simulate stereo visual effects by mirroring keyframe values, enhancing the visualization's depth.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`frame_rate`**
    - The frame rate at which the animation or effect is intended to be played, impacting the timing and smoothness of the visualization.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`schedule_list_a`**
    - An optional list of keyframe values for additional visualization, allowing for comparison or layering of multiple animations.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`schedule_list_b`**
    - Another optional list of keyframe values for visualization, enabling more complex comparisons or layered animations.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`schedule_list_c`**
    - A third optional list of keyframe values for visualization, further expanding the capability for complex animation analysis.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
## Output types
- **`ui`**
    - Generates a visual representation of the keyframe data, including metrics and a plot, to facilitate analysis and refinement of animations.
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
