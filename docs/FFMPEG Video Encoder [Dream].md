
# Documentation
- Class name: FFMPEG Video Encoder [Dream]
- Category: ✨ Dream/🎥 animation/⚙ postprocessing
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FFMPEG Video Encoder节点旨在使用FFMPEG将一系列图像编码并合成为视频文件。它允许调整帧率，可选择在编码后删除源图像，并能处理文件命名以避免覆盖，从而方便从单独的帧创建视频内容。

# Input types
## Required
- sequence
    - 表示要编码成视频的图像序列。它对定义最终视频输出中的内容和帧的顺序至关重要。
    - Comfy dtype: ANIMATION_SEQUENCE
    - Python dtype: AnimationSequence
- name
    - 指定输出视频文件的基本名称，可以进一步调整以避免文件名冲突。
    - Comfy dtype: STRING
    - Python dtype: str
- framerate_factor
    - 序列帧率的乘数，允许调整结果视频的速度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- remove_images
    - 确定是否在编码后删除源图像，有助于管理磁盘空间。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- log_entry
    - 提供一个详细记录编码过程和结果的日志条目，包括遇到的任何错误。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamVideoEncoder:
    NODE_NAME = "FFMPEG Video Encoder"
    DISPLAY_NAME = "Video Encoder (FFMPEG)"
    ICON = "🎬"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.sequence | {
                "name": ("STRING", {"default": 'video', "multiline": False}),
                "framerate_factor": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 100.0}),
                "remove_images": ("BOOLEAN", {"default": True})
            },
        }

    CATEGORY = NodeCategories.ANIMATION_POSTPROCESSING
    RETURN_TYPES = (LogEntry.ID,)
    RETURN_NAMES = ("log_entry",)
    OUTPUT_NODE = True
    FUNCTION = "encode"

    @classmethod
    def IS_CHANGED(cls, sequence: AnimationSequence, **kwargs):
        return sequence.is_defined

    def _find_free_filename(self, filename, defaultdir):
        if os.path.basename(filename) == filename:
            filename = os.path.join(defaultdir, filename)
        n = 1
        tested = filename
        while os.path.exists(tested):
            n += 1
            (b, ext) = os.path.splitext(filename)
            tested = b + "_" + str(n) + ext
        return tested

    def generate_video(self, files, fps, filename, config):
        filename = self._find_free_filename(filename, os.path.dirname(files[0]))
        _ffmpeg(config, files, fps, filename)
        return filename

    def encode(self, sequence: AnimationSequence, name: str, remove_images, framerate_factor):
        if not sequence.is_defined:
            return (LogEntry([]),)

        config = DreamConfig()
        filename = _make_video_filename(name, config.get("ffmpeg.file_extension", "mp4"))
        log_entry = LogEntry([])
        for batch_num in sequence.batches:
            try:
                images = list(sequence.get_image_files_of_batch(batch_num))
                actual_filename = self.generate_video(images, sequence.fps * framerate_factor, filename, config)

                log_entry = log_entry.add("Generated video '{}'".format(actual_filename))
                if remove_images:
                    for imagepath in images:
                        if os.path.isfile(imagepath):
                            os.unlink(imagepath)
            except Exception as e:
                on_error(self.__class__, str(e))
        return (log_entry,)

```
