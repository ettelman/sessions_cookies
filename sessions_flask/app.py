from flask import Flask, request, render_template, session, redirect, url_for, make_response

app = Flask(__name__)
app.secret_key = "secret"


users = {"bobbo": "password123", "admin": "admin"}

#
@app.route("/")
def index():
    if "username" in session:
        return redirect(url_for("profile"))
    return "Välkommen! <a href='/login'>Logga in</a>"


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if username in users and users[username] == password:
            session["username"] = username
            return redirect(url_for("profile"))
        else:
            error = "Felaktigt användarnamn eller lösenord"

    return render_template("login.html", error=error)


@app.route("/profile")
def profile():
    if "username" not in session:
        return redirect(url_for("login"))

    # Hämta färgtema från cookie
    theme = request.cookies.get("theme", "light") 

    return render_template("profile.html", username=session["username"], theme=theme)


@app.route("/theme/<mode>")
def set_theme(mode):
    if mode not in ["light", "dark"]:
        return "Ogiltigt tema", 400

    resp = make_response(redirect(url_for("profile")))
    resp.set_cookie("theme", mode, max_age=60*60*24*30)  # 30 dagar
    return resp

# Logga ut, 
@app.route("/logout")
def logout():
    session.pop("username", None)
    resp = make_response(redirect(url_for("index")))
    resp.set_cookie("theme", "", max_age=0)  # Ta bort cookie
    return resp


if __name__ == "__main__":
    app.run(debug=True)
