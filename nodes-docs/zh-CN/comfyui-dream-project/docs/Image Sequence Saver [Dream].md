
# Documentation
- Class name: Image Sequence Saver [Dream]
- Category: ✨ Dream/🌄 image/🎥 animation
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Image Sequence Saver节点旨在将动画序列的单帧保存到磁盘，支持多种文件格式和配置选项。它允许对输出的命名约定、目录结构和文件格式进行详细控制，有助于创建有组织且易于访问的动画帧库。

# Input types
## Required
- frame_counter
    - 指定动画序列中的当前帧，用于确定文件名以及根据'at_end'参数决定是否继续保存过程。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- image
    - 要为当前帧保存的图像，代表动画序列中的单个快照。
    - Comfy dtype: IMAGE
    - Python dtype: DreamImage
- directory_path
    - 图像文件将被保存的目标目录路径，允许有组织地存储动画帧。
    - Comfy dtype: STRING
    - Python dtype: str
- prefix
    - 添加到每个保存图像文件名前的前缀，有助于在目录中识别和组织帧。
    - Comfy dtype: STRING
    - Python dtype: str
- digits
    - 用于文件名中帧号零填充的位数，确保一致的文件命名约定。
    - Comfy dtype: INT
    - Python dtype: int
- at_end
    - 决定当达到动画序列末尾时的行为，提供停止输出、引发错误或继续执行的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- filetype
    - 指定保存图像的文件格式，包括带或不带嵌入工作流信息的PNG，以及JPG格式选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- sequence
    - 保存当前帧后更新的动画序列，反映任何变化或添加。
    - Comfy dtype: ANIMATION_SEQUENCE
    - Python dtype: AnimationSequence.ID
- log_entry
    - 详细记录保存操作结果的日志条目，包括成功消息或错误信息。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry.ID


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageSequenceOutput:
    NODE_NAME = "Image Sequence Saver"
    ICON = "💾"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "image": ("IMAGE",),
                "directory_path": ("STRING", {"default": comfy_paths.output_directory, "multiline": False}),
                "prefix": ("STRING", {"default": 'frame', "multiline": False}),
                "digits": ("INT", {"default": 5}),
                "at_end": (["stop output", "raise error", "keep going"],),
                "filetype": (['png with embedded workflow', "png", 'jpg'],),
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO"
            },
        }

    CATEGORY = NodeCategories.IMAGE_ANIMATION
    RETURN_TYPES = (AnimationSequence.ID, LogEntry.ID)
    OUTPUT_NODE = True
    RETURN_NAMES = ("sequence", "log_entry")
    FUNCTION = "save"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def _get_new_filename(self, current_frame, prefix, digits, filetype):
        return prefix + "_" + str(current_frame).zfill(digits) + "." + filetype.split(" ")[0]

    def _save_single_image(self, dream_image: DreamImage, batch_counter, frame_counter: FrameCounter,
                           directory_path,
                           prefix, digits, filetype, prompt, extra_pnginfo, at_end, logger):

        if at_end == "stop output" and frame_counter.is_after_last_frame:
            logger("Reached end of animation - not saving output!")
            return ()
        if at_end == "raise error" and frame_counter.is_after_last_frame:
            logger("Reached end of animation - raising error to stop processing!")
            raise Exception("Reached end of animation!")
        filename = self._get_new_filename(frame_counter.current_frame, prefix, digits, filetype)
        if batch_counter >= 0:
            filepath = os.path.join(directory_path, "batch_" + (str(batch_counter).zfill(4)), filename)
        else:
            filepath = os.path.join(directory_path, filename)
        save_dir = os.path.dirname(filepath)
        if not os.path.isdir(save_dir):
            os.makedirs(save_dir)
        if filetype.startswith("png"):
            dream_image.save_png(filepath, filetype == 'png with embedded workflow', prompt, extra_pnginfo)
        elif filetype == "jpg":
            dream_image.save_jpg(filepath, int(CONFIG.get("encoding.jpeg_quality", 95)))
        logger("Saved {} in {}".format(filename, os.path.abspath(save_dir)))
        return ()

    def _generate_animation_sequence(self, filetype, directory_path, frame_counter):
        if filetype.startswith("png"):
            pattern = "*.png"
        else:
            pattern = "*.jpg"
        frames = list_images_in_directory(directory_path, pattern, False)
        return AnimationSequence(frame_counter, frames)

    def save(self, image, **args):
        log_texts = list()
        logger = lambda s: log_texts.append(s)
        if not args.get("directory_path", ""):
            args["directory_path"] = comfy_paths.output_directory
        args["logger"] = logger
        proc = DreamImageProcessor(image, **args)
        proc.process(self._save_single_image)
        frame_counter = args["frame_counter"]
        log_entry = LogEntry([])
        for text in log_texts:
            log_entry = log_entry.add(text)
        if frame_counter.is_final_frame:
            return (self._generate_animation_sequence(args["filetype"], args["directory_path"],
                                                      frame_counter), log_entry)
        else:
            return (AnimationSequence(frame_counter), log_entry)

```
