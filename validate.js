$(document).ready(function () {


    $("form[name='registration']").validate({
        // Specify validation rules
        rules: {
          // The key name on the left side is the name attribute
          // of an input field. Validation rules are defined
          // on the right side
          firstname: {
            required: true,
            minlength: 2
          },
          lastname: {
            required: true,
            minlength: 3
          },
          email: {
            required: true,
            // Specify that email should be validated
            // by the built-in "email" rule
            email: true
          },
          phn: {
            required: true,
            minlength: 10
            
          },
          pwd: {
            required: true,
            minlength: 5
          },
          pwd2: {
            required: true,
            minlength: 5,
            equalTo: "#pwd"
          },
          dob: {
            required: true
          },
          gender:{
              required:true
          },
          addr: {
            required: true,
            minlength: 5
          },
          city: {
            required: true,
            minlength: 3
          },
          state: {
            required: true,
            minlength: 3
          },
          country: {
            required: true
          },
          zip: {
            required: true,
            minlength: 3
          },
        },
        messages: {
            firstname: {
              required: "Please enter your firstname",
              minlength: "Name must be at least 2 characters long"
            },
            lastname: {
              required: "Please enter your lastname",
              minlength: "Name must be at least 3 characters long"
            },
            email:{
                required: "Please enter your email",
                email: "Please enter a valid email address"
              },
              phn: {
                required: "Please enter your phone number",
                minlength: "Phone number must be 10 digits only!"
            
              },
              pwd: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
              },
              pwd2: {
                required: "Please confirm your password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same password to confirm!"
              },
              dob: {
                required: "Please select your birth date."
              },
              gender:{
                  required: "Please select your gender!"
              },
              addr: {
                required: "Please enter your address.",
                minlength: "Your address must be at least 5 characters long"
              },
              city: {
                required: "Please enter your city!",
                minlength: "City must be at least 3 characters long"
              },
              state: {
                required: "Please enter your state!",
                minlength: "State must be at least 3 characters long"
              },
              country: {
                required: "Please select your country!"
              },
              zip: {
                required: "Please enter zip code!",
                minlength: "Zip code must be at least 3 characters long"
              },
              
              
        },
        // submitHandler: function (form) {
        //     // $(form).ajaxSubmit();
        //     form.submit();
        //   }
        });
    

    

        // $('#fname').mouseenter(function(){
        //     $('.form-error').val('This is field required');
        // })


    'use strict'

    // // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
         .forEach(function (form) {
             form.addEventListener('submit', function (event) {
                 $(window).scrollTop(0);
                
                 if (!form.checkValidity()) {
                     event.preventDefault()
                     event.stopPropagation()
                 }

                 form.classList.add('was-validated')
             }, false)
         })


    



    $('button[type=submit]').attr('disabled', 'disabled');

    var c1 = captcha();
    c1.generateCapEqu();

    var v1 = validate();
    v1.formfields();

})


    var validate = function(){

        function seterror(id,error){
            element = $(id);
            element.$('formerror').val(error);
        }

        function formfields(){
            var returnval = true;
            var fname=$("#fname").val();
            if(fname.length<5){
                seterror("fname","Length of first name is too short");
                returnval = false;
            }
        }
        return{formfields};
    }

    // Using reveal module pattern function in captcha field
    var captcha = function () {
        const equations = ["+", "-", "*", "/"];
        let expectedOutput = "";
        let capEqu = "";
        function generateCapEqu() {
            var operation = generateRandomOp();
            var num1 = genRandomNo(100);
            var num2 = genRandomNo(10);
            var division = check(operation, num1, num2);
            if (division != 0) {
                num1 = division;
            }
            capEqu = num1 + " " + operation + " " + num2;
            $("#captcha_equ").text(capEqu);
            expectedOutput = parseInt(calOut(num1, num2, operation));
            console.log(expectedOutput);  //print expected output of equation
        }
        function check(operation, num1, num2) {
            if (operation == '/') {
                if (num1 / num2 == 0) {
                    return 0;
                }
                else {
                    var a = parseInt(num1 / num2);
                    return num2 * a;
                }
            }
            else {
                return 0;
            }

        }
        function calOut(num1, num2, operation) {
            switch (operation) {
                case '+':
                    return num1 + num2;
                case '-':
                    return num1 - num2;
                case '*':
                    return num1 * num2;
                case '/':
                    return parseInt(num1 / num2);
            }
        }
        function generateRandomOp() {
            const index = Math.floor(Math.random() * 10) % 4;
            return equations[index];
        }
        function genRandomNo(num) {
            return Math.floor(Math.random() * num) + Math.floor(Math.random() * 10);
        }


        $("#answer").keyup(function () {

            var input = $(this).val();
            var slideSpeed = 200;

            $('#message').hide();

            if (input == expectedOutput) {

                $('button[type=submit]').removeAttr('disabled');
                $('#success').slideDown(slideSpeed);
                $('#fail').slideUp(slideSpeed);

            } else {

                $('button[type=submit]').attr('disabled', 'disabled');
                $('#fail').slideDown(slideSpeed);
                $('#success').slideUp(slideSpeed);

            }

        });

        $(".reset").on("click", function () {
            generateCapEqu();
            $("#answer").val('');
            var slideSpeed = 200;
            $('#message').slideDown(slideSpeed);
            $('#fail').slideUp(slideSpeed);
            $('#success').slideUp(slideSpeed);
            $('button[type=submit]').attr('disabled', 'disabled');
        });

        return{
            generateCapEqu 
        }
    }




