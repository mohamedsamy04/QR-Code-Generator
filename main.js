$(document).ready(function() {
  let $btn = $(".qr-button");
  let $qr_code_element = $(".qr-code");
  let $downloadLink = $("#downloadLink");
  let $qr_container = $(".qr-container");

  $btn.on("click", function() {
    let $user_input = $("#input_text");

    if ($user_input.val() !== "") {
      if ($qr_code_element.children().length === 0) {
        generate($user_input);
      } else {
        $qr_code_element.html("");
        generate($user_input);
      }
    } else {
      console.log("Input tidak valid");
      $qr_code_element.hide();
      $downloadLink.hide();
    }
  });

  function generate($user_input) {
    $qr_code_element.show().css({ "margin-top": "20px", "margin-bottom": "20px" });

    var qrcode = new QRCode($qr_code_element[0], {
      text: `${$user_input.val()}`,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.H,
    });

    setTimeout(function() {
      let qr_code_canvas = $("canvas")[0];
      let paddedCanvas = addPaddingToQRCode(qr_code_canvas, 20);
      $downloadLink.show().attr("href", paddedCanvas.toDataURL("image/png")).attr("download", "qrcode.png");
      $qr_code_element.addClass('show');

      $qr_container.addClass('enlarged');
    }, 500);
  }

  function addPaddingToQRCode(originalCanvas, padding) {
    let canvas = document.createElement("canvas");
    canvas.width = originalCanvas.width + padding * 2;
    canvas.height = originalCanvas.height + padding * 2;

    let context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF"; 
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(originalCanvas, padding, padding);
    return canvas;
  }

  tippy('#About', {
    arrow: true,
    content: 'Created By ekizr',
    animation: 'fade',
  });
});
